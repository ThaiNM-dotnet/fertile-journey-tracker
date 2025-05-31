import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Calendar, CreditCard, Bell } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/hooks/useNotifications";

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
  });
  const { notifications, unreadCount } = useNotifications();

  useEffect(() => {
    if (user) {
      // Fetch user profile data here using user.id
      // For now, let's use dummy data
      setProfile({
        fullName: user?.email || "Chưa có thông tin",
        email: user?.email || "Chưa có thông tin",
        phone: "123-456-7890",
        address: "123 Main St, Anytown",
        dateOfBirth: "01/01/1990",
        gender: "Nam",
      });
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate("/")} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <div className="flex items-center">
            <User className="h-6 w-6 text-pink-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Hồ sơ cá nhân</h1>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Thông tin cá nhân
              </CardTitle>
              <CardDescription>
                Xem và chỉnh sửa thông tin cá nhân của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Họ và tên:</p>
                <p className="text-gray-600">{profile.fullName}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Email:</p>
                <p className="text-gray-600">{profile.email}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Số điện thoại:</p>
                <p className="text-gray-600">{profile.phone}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Địa chỉ:</p>
                <p className="text-gray-600">{profile.address}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Ngày sinh:</p>
                <p className="text-gray-600">{profile.dateOfBirth}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Giới tính:</p>
                <p className="text-gray-600">{profile.gender}</p>
              </div>
              <Button variant="outline" className="w-full">
                Chỉnh sửa thông tin
              </Button>
            </CardContent>
          </Card>

          {/* Notifications Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Thông báo
                </span>
                {unreadCount > 0 && (
                  <Badge variant="destructive">{unreadCount}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {notifications.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  Chưa có thông báo nào
                </p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {notifications.slice(0, 5).map((notification) => (
                    <div 
                      key={notification.id}
                      className={cn(
                        "p-3 rounded-lg border-l-4",
                        notification.is_read ? "bg-gray-50 border-gray-300" : "bg-blue-50 border-blue-500"
                      )}
                    >
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDistanceToNow(new Date(notification.created_at), {
                          addSuffix: true,
                          locale: vi
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                onClick={() => navigate("/payment")}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Thanh toán dịch vụ
              </Button>
            </CardContent>
          </Card>

          {/* Appointments Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Lịch hẹn
              </CardTitle>
              <CardDescription>
                Xem lịch sử và quản lý lịch hẹn của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-4">
                Chưa có lịch hẹn nào
              </p>
              <Button variant="outline" className="w-full">
                Xem tất cả lịch hẹn
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
