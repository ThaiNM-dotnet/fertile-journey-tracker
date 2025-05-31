
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, MessageCircle, Heart, ArrowLeft, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  full_name: string;
  phone: string;
  age: number;
}

interface Appointment {
  id: string;
  doctor_name: string;
  appointment_date: string;
  appointment_time: string;
  service_type: string;
  status: string;
  notes: string;
}

interface Consultation {
  id: string;
  subject: string;
  message: string;
  response: string;
  status: string;
  created_at: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<Profile>({ full_name: "", phone: "", age: 0 });
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    fetchUserData();
  }, [user, navigate]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile({
          full_name: profileData.full_name || "",
          phone: profileData.phone || "",
          age: profileData.age || 0
        });
      }

      // Fetch appointments
      const { data: appointmentsData } = await supabase
        .from("appointments")
        .select("*")
        .eq("user_id", user.id)
        .order("appointment_date", { ascending: false });

      if (appointmentsData) {
        setAppointments(appointmentsData);
      }

      // Fetch consultations
      const { data: consultationsData } = await supabase
        .from("consultations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (consultationsData) {
        setConsultations(consultationsData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setUpdating(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        age: profile.age || null
      })
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Lỗi cập nhật",
        description: "Không thể cập nhật thông tin. Vui lòng thử lại.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin cá nhân đã được cập nhật."
      });
    }

    setUpdating(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: "Chờ xác nhận", variant: "secondary" as const },
      confirmed: { label: "Đã xác nhận", variant: "default" as const },
      cancelled: { label: "Đã hủy", variant: "destructive" as const },
      completed: { label: "Hoàn thành", variant: "default" as const },
      answered: { label: "Đã trả lời", variant: "default" as const }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || { label: status, variant: "secondary" as const };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-8 w-8 text-pink-600 mx-auto mb-4 animate-pulse" />
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => navigate("/")} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-pink-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-800">Trang cá nhân</h1>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Thông tin cá nhân
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Lịch hẹn
            </TabsTrigger>
            <TabsTrigger value="consultations" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Tư vấn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
                <CardDescription>
                  Cập nhật thông tin của bạn để chúng tôi có thể phục vụ tốt hơn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={updateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user?.email || ""} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input
                      id="fullName"
                      value={profile.full_name}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Tuổi</Label>
                    <Input
                      id="age"
                      type="number"
                      value={profile.age || ""}
                      onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <Button type="submit" className="bg-pink-600 hover:bg-pink-700" disabled={updating}>
                    {updating ? "Đang cập nhật..." : "Cập nhật thông tin"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Bạn chưa có lịch hẹn nào</p>
                    <Button className="mt-4 bg-pink-600 hover:bg-pink-700" onClick={() => navigate("/booking")}>
                      Đặt lịch hẹn ngay
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                appointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">{appointment.service_type}</h3>
                          <p className="text-sm text-gray-600">Bác sĩ: {appointment.doctor_name}</p>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>📅 {new Date(appointment.appointment_date).toLocaleDateString('vi-VN')} - {appointment.appointment_time}</p>
                        {appointment.notes && <p>📝 {appointment.notes}</p>}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="consultations">
            <div className="space-y-4">
              {consultations.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Bạn chưa có câu hỏi tư vấn nào</p>
                    <Button className="mt-4 bg-pink-600 hover:bg-pink-700" onClick={() => navigate("/consultation")}>
                      Gửi câu hỏi tư vấn
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                consultations.map((consultation) => (
                  <Card key={consultation.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold">{consultation.subject}</h3>
                        {getStatusBadge(consultation.status)}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Câu hỏi:</p>
                          <p className="text-sm text-gray-600">{consultation.message}</p>
                        </div>
                        {consultation.response && (
                          <div className="bg-pink-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-pink-800">Trả lời:</p>
                            <p className="text-sm text-pink-700">{consultation.response}</p>
                          </div>
                        )}
                        <p className="text-xs text-gray-500">
                          {new Date(consultation.created_at).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
