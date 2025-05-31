
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Heart, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Booking = () => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Cần đăng nhập",
        description: "Vui lòng đăng nhập để đặt lịch hẹn",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("appointments").insert({
      user_id: user.id,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      doctor_name: doctorName,
      service_type: serviceType,
      notes: notes || null
    });

    if (error) {
      toast({
        title: "Lỗi đặt lịch",
        description: "Không thể đặt lịch hẹn. Vui lòng thử lại.",
        variant: "destructive"
      });
      console.error("Booking error:", error);
    } else {
      toast({
        title: "Đặt lịch thành công",
        description: "Lịch hẹn của bạn đã được ghi nhận. Chúng tôi sẽ liên hệ xác nhận sớm."
      });
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-6">
      <div className="container mx-auto max-w-2xl">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate("/")} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-pink-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Đặt lịch hẹn</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-pink-600" />
              Thông tin lịch hẹn
            </CardTitle>
            <CardDescription>
              Vui lòng điền đầy đủ thông tin để chúng tôi có thể phục vụ bạn tốt nhất
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Ngày hẹn</Label>
                  <Input
                    id="date"
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Giờ hẹn</Label>
                  <Select value={appointmentTime} onValueChange={setAppointmentTime} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giờ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00">08:00</SelectItem>
                      <SelectItem value="08:30">08:30</SelectItem>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="09:30">09:30</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="10:30">10:30</SelectItem>
                      <SelectItem value="11:00">11:00</SelectItem>
                      <SelectItem value="11:30">11:30</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="14:30">14:30</SelectItem>
                      <SelectItem value="15:00">15:00</SelectItem>
                      <SelectItem value="15:30">15:30</SelectItem>
                      <SelectItem value="16:00">16:00</SelectItem>
                      <SelectItem value="16:30">16:30</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctor">Bác sĩ</Label>
                <Select value={doctorName} onValueChange={setDoctorName} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn bác sĩ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BS. Nguyễn Văn A">BS. Nguyễn Văn A - Chuyên khoa Sản phụ khoa</SelectItem>
                    <SelectItem value="BS. Trần Thị B">BS. Trần Thị B - Chuyên khoa Hiếm muộn</SelectItem>
                    <SelectItem value="BS. Lê Văn C">BS. Lê Văn C - Chuyên khoa Nam khoa</SelectItem>
                    <SelectItem value="BS. Phạm Thị D">BS. Phạm Thị D - Chuyên khoa Nội tiết sinh sản</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Dịch vụ</Label>
                <Select value={serviceType} onValueChange={setServiceType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn dịch vụ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tư vấn ban đầu">Tư vấn ban đầu</SelectItem>
                    <SelectItem value="IUI - Thụ tinh trong tử cung">IUI - Thụ tinh trong tử cung</SelectItem>
                    <SelectItem value="IVF - Thụ tinh trong ống nghiệm">IVF - Thụ tinh trong ống nghiệm</SelectItem>
                    <SelectItem value="Khám định kỳ">Khám định kỳ</SelectItem>
                    <SelectItem value="Xét nghiệm chuyên khoa">Xét nghiệm chuyên khoa</SelectItem>
                    <SelectItem value="Siêu âm">Siêu âm</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
                <Textarea
                  id="notes"
                  placeholder="Mô tả triệu chứng hoặc yêu cầu đặc biệt..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={loading}>
                {loading ? "Đang đặt lịch..." : "Đặt lịch hẹn"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Booking;
