
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Users, Heart, Calendar, TrendingUp, Star, Phone, Clock, DollarSign } from "lucide-react";

const monthlyData = [
  { month: "T1", patients: 45, treatments: 32, revenue: 2400 },
  { month: "T2", patients: 52, treatments: 38, revenue: 2800 },
  { month: "T3", patients: 48, treatments: 35, revenue: 2600 },
  { month: "T4", patients: 61, treatments: 42, revenue: 3200 },
  { month: "T5", patients: 55, treatments: 39, revenue: 2900 },
  { month: "T6", patients: 67, treatments: 48, revenue: 3800 },
];

const treatmentData = [
  { name: "IVF", value: 45, color: "#ec4899" },
  { name: "IUI", value: 30, color: "#8b5cf6" },
  { name: "ICSI", value: 20, color: "#06b6d4" },
  { name: "Tư vấn", value: 5, color: "#84cc16" },
];

const recentActivities = [
  {
    id: 1,
    type: "new_patient",
    message: "Bệnh nhân mới: Nguyễn Thị Mai đăng ký IVF",
    time: "5 phút trước",
    icon: Users
  },
  {
    id: 2,
    type: "appointment",
    message: "Lịch hẹn: Lê Thị Hoa - Siêu âm theo dõi",
    time: "15 phút trước",
    icon: Calendar
  },
  {
    id: 3,
    type: "treatment",
    message: "Hoàn thành: Phạm Thị Lan - Chuyển phôi thành công",
    time: "1 giờ trước",
    icon: Heart
  },
  {
    id: 4,
    type: "review",
    message: "Đánh giá mới: BS. Trần Văn A nhận 5 sao",
    time: "2 giờ trước",
    icon: Star
  }
];

const upcomingAppointments = [
  {
    id: 1,
    patient: "Nguyễn Thị Mai",
    doctor: "BS. Trần Văn A",
    time: "09:00",
    type: "Siêu âm theo dõi",
    status: "confirmed"
  },
  {
    id: 2,
    patient: "Lê Thị Hoa",
    doctor: "BS. Nguyễn Thị B",
    time: "10:30",
    type: "Tư vấn IUI",
    status: "pending"
  },
  {
    id: 3,
    patient: "Phạm Thị Lan",
    doctor: "BS. Trần Văn A",
    time: "14:00",
    type: "Lấy trứng",
    status: "confirmed"
  }
];

const Dashboard = () => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "new_patient":
        return Users;
      case "appointment":
        return Calendar;
      case "treatment":
        return Heart;
      case "review":
        return Star;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Tổng quan hoạt động phòng khám và báo cáo thống kê</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tổng bệnh nhân</p>
                  <p className="text-3xl font-bold text-gray-800">1,245</p>
                  <p className="text-sm text-green-600">+12% so với tháng trước</p>
                </div>
                <Users className="w-12 h-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Điều trị thành công</p>
                  <p className="text-3xl font-bold text-gray-800">234</p>
                  <p className="text-sm text-green-600">Tỷ lệ 68%</p>
                </div>
                <Heart className="w-12 h-12 text-pink-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Lịch hẹn hôm nay</p>
                  <p className="text-3xl font-bold text-gray-800">28</p>
                  <p className="text-sm text-blue-600">12 đã hoàn thành</p>
                </div>
                <Calendar className="w-12 h-12 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Doanh thu tháng</p>
                  <p className="text-3xl font-bold text-gray-800">3.8B</p>
                  <p className="text-sm text-green-600">+18% so với tháng trước</p>
                </div>
                <DollarSign className="w-12 h-12 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analytics">Phân tích</TabsTrigger>
            <TabsTrigger value="activities">Hoạt động gần đây</TabsTrigger>
            <TabsTrigger value="appointments">Lịch hẹn hôm nay</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Xu hướng theo tháng</CardTitle>
                  <CardDescription>Số lượng bệnh nhân và điều trị theo tháng</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="patients" fill="#ec4899" name="Bệnh nhân" />
                      <Bar dataKey="treatments" fill="#8b5cf6" name="Điều trị" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Treatment Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Phân bố dịch vụ điều trị</CardTitle>
                  <CardDescription>Tỷ lệ các loại dịch vụ được sử dụng</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={treatmentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {treatmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Revenue Trend */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Xu hướng doanh thu</CardTitle>
                  <CardDescription>Doanh thu theo tháng (triệu VNĐ)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#ec4899" 
                        strokeWidth={3}
                        name="Doanh thu (triệu VNĐ)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hoạt động gần đây</CardTitle>
                <CardDescription>Các hoạt động và sự kiện mới nhất trong hệ thống</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const IconComponent = getActivityIcon(activity.type);
                    return (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="bg-pink-100 p-2 rounded-full">
                          <IconComponent className="w-5 h-5 text-pink-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">{activity.message}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lịch hẹn hôm nay</CardTitle>
                <CardDescription>Danh sách các cuộc hẹn trong ngày hôm nay</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{appointment.patient}</h4>
                          <p className="text-sm text-gray-600">{appointment.type}</p>
                          <p className="text-sm text-gray-500">
                            {appointment.time} - {appointment.doctor}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Gọi
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
