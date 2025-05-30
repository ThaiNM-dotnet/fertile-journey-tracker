
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Stethoscope, Plus, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockBookings = [
  {
    id: 1,
    patientName: "Nguyễn Thị Mai",
    doctorName: "BS. Trần Văn A",
    date: "2024-01-20",
    time: "09:00",
    type: "Siêu âm theo dõi",
    status: "confirmed",
    notes: "Theo dõi sự phát triển nang trứng"
  },
  {
    id: 2,
    patientName: "Lê Thị Hoa",
    doctorName: "BS. Nguyễn Thị B",
    date: "2024-01-20",
    time: "10:30",
    type: "Tư vấn IUI",
    status: "pending",
    notes: "Tư vấn phương pháp điều trị IUI"
  },
  {
    id: 3,
    patientName: "Phạm Thị Lan",
    doctorName: "BS. Trần Văn A",
    date: "2024-01-21",
    time: "14:00",
    type: "Lấy trứng",
    status: "confirmed",
    notes: "Thực hiện quy trình lấy trứng IVF"
  },
  {
    id: 4,
    patientName: "Hoàng Thị Thu",
    doctorName: "BS. Nguyễn Thị B",
    date: "2024-01-21",
    time: "15:30",
    type: "Khám tái khám",
    status: "cancelled",
    notes: "Bệnh nhân hủy lịch hẹn"
  }
];

const upcomingReminders = [
  {
    id: 1,
    patientName: "Nguyễn Thị Mai",
    type: "Tiêm thuốc",
    time: "20:00",
    date: "2024-01-19",
    medication: "Gonal-F 75 IU"
  },
  {
    id: 2,
    patientName: "Lê Thị Hoa",
    type: "Xét nghiệm",
    time: "08:00",
    date: "2024-01-20",
    medication: "Xét nghiệm hormone"
  }
];

export const BookingManagement = () => {
  const [selectedDate, setSelectedDate] = useState("2024-01-20");
  const [bookings] = useState(mockBookings);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận";
      case "pending":
        return "Chờ xác nhận";
      case "cancelled":
        return "Đã hủy";
      default:
        return "Chưa xác định";
    }
  };

  const todayBookings = bookings.filter(booking => booking.date === selectedDate);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            Đặt lịch mới
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Bộ lọc
          </Button>
        </div>
      </div>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Lịch hôm nay</TabsTrigger>
          <TabsTrigger value="upcoming">Lịch sắp tới</TabsTrigger>
          <TabsTrigger value="reminders">Nhắc nhở</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Lịch hẹn ngày {selectedDate}
              </CardTitle>
              <CardDescription>
                Tổng {todayBookings.length} lịch hẹn trong ngày
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayBookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold text-lg">{booking.time}</span>
                        <Badge className={getStatusColor(booking.status)}>
                          {getStatusText(booking.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{booking.patientName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Stethoscope className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{booking.doctorName}</span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="font-medium text-sm text-pink-600">{booking.type}</p>
                        <p className="text-sm text-gray-600">{booking.notes}</p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button variant="outline" size="sm">
                        Chỉnh sửa
                      </Button>
                      <Button variant="outline" size="sm">
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {todayBookings.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">
                    Không có lịch hẹn
                  </h3>
                  <p className="text-gray-400">
                    Chưa có lịch hẹn nào được đặt cho ngày này
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Lịch hẹn sắp tới
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bookings.filter(b => b.status !== 'cancelled').map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-semibold">{booking.patientName}</h4>
                      <p className="text-sm text-gray-600">{booking.type}</p>
                      <p className="text-sm text-gray-500">
                        {booking.date} - {booking.time} | {booking.doctorName}
                      </p>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {getStatusText(booking.status)}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Lịch nhắc nhở
              </CardTitle>
              <CardDescription>
                Nhắc nhở tiêm thuốc và xét nghiệm cho bệnh nhân
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingReminders.map((reminder) => (
                <div key={reminder.id} className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-gray-800">{reminder.patientName}</h4>
                      <p className="text-sm font-medium text-yellow-700">{reminder.type}</p>
                      <p className="text-sm text-gray-600">{reminder.medication}</p>
                      <p className="text-sm text-gray-500">
                        {reminder.date} lúc {reminder.time}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Đã nhắc nhở
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
