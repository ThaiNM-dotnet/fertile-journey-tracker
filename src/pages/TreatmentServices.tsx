
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, TestTube, Stethoscope, Calendar, DollarSign, Plus, Edit } from "lucide-react";

const treatmentServices = [
  {
    id: 1,
    name: "IUI - Thụ tinh trong tử cung",
    description: "Phương pháp đưa tinh trùng đã được xử lý trực tiếp vào tử cung",
    duration: "2-3 tuần",
    price: "5,000,000",
    successRate: "15-20%",
    category: "Thụ tinh hỗ trợ",
    steps: [
      "Thăm khám và tư vấn ban đầu",
      "Theo dõi chu kỳ kinh nguyệt",
      "Kích thích buồng trứng (nếu cần)",
      "Theo dõi siêu âm",
      "Thực hiện IUI",
      "Theo dõi kết quả"
    ],
    requirements: [
      "Vòi trứng thông thoáng",
      "Chất lượng tinh trùng đạt yêu cầu",
      "Chu kỳ kinh nguyệt đều"
    ]
  },
  {
    id: 2,
    name: "IVF - Thụ tinh trong ống nghiệm",
    description: "Kỹ thuật thụ tinh ngoài cơ thể, sau đó chuyển phôi về tử cung",
    duration: "4-6 tuần",
    price: "80,000,000",
    successRate: "40-50%",
    category: "Thụ tinh ống nghiệm",
    steps: [
      "Tư vấn và lập kế hoạch điều trị",
      "Kích thích buồng trứng",
      "Theo dõi siêu âm định kỳ",
      "Lấy trứng",
      "Thụ tinh trong phòng lab",
      "Nuôi cấy phôi",
      "Chuyển phôi",
      "Theo dõi beta HCG"
    ],
    requirements: [
      "Đánh giá sức khỏe tổng quát",
      "Xét nghiệm hormone đầy đủ",
      "Siêu âm buồng trứng"
    ]
  },
  {
    id: 3,
    name: "ICSI - Tiêm tinh trùng vào trứng",
    description: "Kỹ thuật tiêm trực tiếp tinh trùng vào tế bào trứng",
    duration: "4-6 tuần",
    price: "90,000,000",
    successRate: "45-55%",
    category: "Thụ tinh ống nghiệm",
    steps: [
      "Tư vấn và đánh giá",
      "Kích thích buồng trứng",
      "Lấy trứng và tinh trùng",
      "Thực hiện ICSI",
      "Nuôi cấy phôi",
      "Chuyển phôi",
      "Theo dõi thai"
    ],
    requirements: [
      "Tinh trùng có vấn đề về số lượng/chất lượng",
      "IVF thất bại trước đó",
      "Tuổi trứng cao"
    ]
  }
];

const mockBookings = [
  {
    id: 1,
    patientName: "Nguyễn Thị Mai",
    service: "IVF",
    stage: "Kích thích buồng trứng",
    doctor: "BS. Trần Văn A",
    startDate: "2024-01-01",
    nextAppointment: "2024-01-20",
    status: "in-progress"
  },
  {
    id: 2,
    patientName: "Lê Thị Hoa",
    service: "IUI",
    stage: "Hoàn thành",
    doctor: "BS. Nguyễn Thị B",
    startDate: "2023-12-15",
    nextAppointment: "2024-02-01",
    status: "completed"
  }
];

const TreatmentServices = () => {
  const [selectedService, setSelectedService] = useState(treatmentServices[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "in-progress":
        return "Đang điều trị";
      case "completed":
        return "Hoàn thành";
      case "pending":
        return "Chờ bắt đầu";
      default:
        return "Chưa xác định";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quản lý dịch vụ điều trị</h1>
          <p className="text-gray-600">Quản lý các dịch vụ điều trị hiếm muộn và theo dõi tiến trình bệnh nhân</p>
        </div>

        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Dịch vụ điều trị
            </TabsTrigger>
            <TabsTrigger value="active-treatments" className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              Điều trị đang thực hiện
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Bảng giá dịch vụ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Danh sách dịch vụ</h2>
              <Button className="bg-pink-600 hover:bg-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                Thêm dịch vụ
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Service List */}
              <div className="space-y-4">
                {treatmentServices.map((service) => (
                  <Card 
                    key={service.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedService.id === service.id ? 'ring-2 ring-pink-500' : ''
                    }`}
                    onClick={() => setSelectedService(service)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">{service.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{service.category}</Badge>
                        <span className="text-sm font-medium text-pink-600">{service.successRate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Service Details */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl text-gray-800">{selectedService.name}</CardTitle>
                        <CardDescription>{selectedService.description}</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Chỉnh sửa
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="overview" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                        <TabsTrigger value="process">Quy trình</TabsTrigger>
                        <TabsTrigger value="requirements">Yêu cầu</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          <Card>
                            <CardContent className="p-4 text-center">
                              <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                              <h4 className="font-semibold text-gray-800">{selectedService.duration}</h4>
                              <p className="text-sm text-gray-600">Thời gian điều trị</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 text-center">
                              <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                              <h4 className="font-semibold text-gray-800">{selectedService.price}đ</h4>
                              <p className="text-sm text-gray-600">Chi phí điều trị</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 text-center">
                              <TestTube className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                              <h4 className="font-semibold text-gray-800">{selectedService.successRate}</h4>
                              <p className="text-sm text-gray-600">Tỷ lệ thành công</p>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>

                      <TabsContent value="process" className="space-y-4">
                        <h4 className="font-semibold text-gray-700 mb-3">Các bước thực hiện</h4>
                        <div className="space-y-3">
                          {selectedService.steps.map((step, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="bg-pink-100 text-pink-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                                {index + 1}
                              </div>
                              <p className="text-gray-700">{step}</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="requirements" className="space-y-4">
                        <h4 className="font-semibold text-gray-700 mb-3">Yêu cầu và điều kiện</h4>
                        <div className="space-y-2">
                          {selectedService.requirements.map((req, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                              <p className="text-gray-700">{req}</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="active-treatments" className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Điều trị đang thực hiện</h2>
            
            <div className="space-y-4">
              {mockBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold text-gray-800">{booking.patientName}</h3>
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusText(booking.status)}
                          </Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <p><span className="font-medium">Dịch vụ:</span> {booking.service}</p>
                            <p><span className="font-medium">Giai đoạn:</span> {booking.stage}</p>
                          </div>
                          <div>
                            <p><span className="font-medium">Bác sĩ:</span> {booking.doctor}</p>
                            <p><span className="font-medium">Hẹn tiếp theo:</span> {booking.nextAppointment}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm">
                          Xem chi tiết
                        </Button>
                        <Button variant="outline" size="sm">
                          Cập nhật tiến trình
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Bảng giá dịch vụ</h2>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Cập nhật giá
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {treatmentServices.map((service) => (
                <Card key={service.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription>{service.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <span className="text-3xl font-bold text-pink-600">{service.price}</span>
                        <span className="text-gray-600">đ</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Thời gian:</span>
                          <span className="font-medium">{service.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tỷ lệ thành công:</span>
                          <span className="font-medium text-green-600">{service.successRate}</span>
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        Xem chi tiết
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TreatmentServices;
