
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, User, Plus, Edit, Trash2, Star, Calendar, Award } from "lucide-react";

const mockDoctors = [
  {
    id: 1,
    name: "BS. Trần Văn A",
    specialty: "Sinh sản và Hiếm muộn",
    experience: "15 năm",
    education: "Tiến sĩ Y khoa - Đại học Y Hà Nội",
    rating: 4.8,
    patients: 245,
    phone: "0901234567",
    email: "tran.vana@clinic.com",
    status: "active",
    workingDays: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"],
    workingHours: "8:00 - 17:00",
    certifications: ["Chứng chỉ IVF", "Chứng chỉ Siêu âm chuyên sâu"],
    bio: "Bác sĩ có nhiều năm kinh nghiệm trong lĩnh vực điều trị hiếm muộn, chuyên sâu về IVF và IUI."
  },
  {
    id: 2,
    name: "BS. Nguyễn Thị B",
    specialty: "Sản phụ khoa",
    experience: "12 năm",
    education: "Thạc sĩ Y khoa - Đại học Y TP.HCM",
    rating: 4.9,
    patients: 189,
    phone: "0907654321",
    email: "nguyen.thib@clinic.com",
    status: "active",
    workingDays: ["Thứ 2", "Thứ 4", "Thứ 6", "Thứ 7"],
    workingHours: "8:00 - 16:00",
    certifications: ["Chứng chỉ IUI", "Chứng chỉ Tư vấn di truyền"],
    bio: "Chuyên gia tư vấn và điều trị các vấn đề về sinh sản, có kinh nghiệm điều trị thành công nhiều ca bệnh phức tạp."
  },
  {
    id: 3,
    name: "BS. Lê Văn C",
    specialty: "Nam khoa",
    experience: "8 năm",
    education: "Bác sĩ Y khoa - Đại học Y Huế",
    rating: 4.6,
    patients: 156,
    phone: "0912345678",
    email: "le.vanc@clinic.com",
    status: "on-leave",
    workingDays: ["Thứ 3", "Thứ 5", "Thứ 7"],
    workingHours: "9:00 - 17:00",
    certifications: ["Chứng chỉ Nam khoa"],
    bio: "Chuyên khoa nam học, điều trị các vấn đề về sinh sản nam giới và vô sinh nam."
  }
];

const DoctorManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors] = useState(mockDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "on-leave":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Đang hoạt động";
      case "on-leave":
        return "Tạm nghỉ";
      case "inactive":
        return "Không hoạt động";
      default:
        return "Chưa xác định";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quản lý bác sĩ</h1>
          <p className="text-gray-600">Quản lý thông tin bác sĩ, chuyên môn và lịch làm việc</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Doctor List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm bác sĩ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-pink-600 hover:bg-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                Thêm bác sĩ
              </Button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredDoctors.map((doctor) => (
                <Card 
                  key={doctor.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedDoctor.id === doctor.id ? 'ring-2 ring-pink-500' : ''
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                        <Badge className={getStatusColor(doctor.status)}>
                          {getStatusText(doctor.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                        <span className="text-sm text-gray-500">({doctor.patients} bệnh nhân)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Doctor Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-gray-800">{selectedDoctor.name}</CardTitle>
                    <CardDescription className="text-lg">{selectedDoctor.specialty}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Chỉnh sửa
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Xóa
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="general" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general">Thông tin chung</TabsTrigger>
                    <TabsTrigger value="schedule">Lịch làm việc</TabsTrigger>
                    <TabsTrigger value="qualifications">Bằng cấp</TabsTrigger>
                    <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Thông tin liên hệ</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Điện thoại:</span> {selectedDoctor.phone}</p>
                            <p><span className="font-medium">Email:</span> {selectedDoctor.email}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Kinh nghiệm</h4>
                          <p className="text-sm">{selectedDoctor.experience}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">Trạng thái</h4>
                          <Badge className={getStatusColor(selectedDoctor.status)}>
                            {getStatusText(selectedDoctor.status)}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Giới thiệu</h4>
                        <p className="text-sm text-gray-600">{selectedDoctor.bio}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="schedule" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Ngày làm việc</h4>
                        <div className="space-y-2">
                          {selectedDoctor.workingDays.map((day, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-pink-600" />
                              <span className="text-sm">{day}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Giờ làm việc</h4>
                        <p className="text-sm text-gray-600">{selectedDoctor.workingHours}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="qualifications" className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Học vấn</h4>
                      <p className="text-sm text-gray-600 mb-4">{selectedDoctor.education}</p>
                      
                      <h4 className="font-semibold text-gray-700 mb-3">Chứng chỉ chuyên môn</h4>
                      <div className="space-y-2">
                        {selectedDoctor.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="performance" className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2 fill-current" />
                          <h4 className="font-semibold text-2xl text-gray-800">{selectedDoctor.rating}</h4>
                          <p className="text-sm text-gray-600">Đánh giá trung bình</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <User className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                          <h4 className="font-semibold text-2xl text-gray-800">{selectedDoctor.patients}</h4>
                          <p className="text-sm text-gray-600">Tổng bệnh nhân</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Calendar className="w-8 h-8 text-green-500 mx-auto mb-2" />
                          <h4 className="font-semibold text-2xl text-gray-800">85%</h4>
                          <p className="text-sm text-gray-600">Tỷ lệ thành công</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorManagement;
