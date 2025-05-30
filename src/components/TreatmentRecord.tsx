
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, TestTube, Pill, Heart, TrendingUp } from "lucide-react";

const mockTreatmentData = {
  patient: {
    name: "Nguyễn Thị Mai",
    age: 32,
    treatmentType: "IVF",
    doctor: "BS. Trần Văn A",
    startDate: "2024-01-01"
  },
  timeline: [
    {
      date: "2024-01-01",
      type: "Khám ban đầu",
      description: "Thăm khám và lập kế hoạch điều trị",
      status: "completed"
    },
    {
      date: "2024-01-05",
      type: "Tiêm thuốc kích thích",
      description: "Bắt đầu chu kỳ tiêm thuốc kích thích trứng",
      status: "completed"
    },
    {
      date: "2024-01-10",
      type: "Siêu âm theo dõi",
      description: "Theo dõi sự phát triển của nang trứng",
      status: "completed"
    },
    {
      date: "2024-01-15",
      type: "Lấy trứng",
      description: "Thực hiện quy trình lấy trứng",
      status: "in-progress"
    },
    {
      date: "2024-01-18",
      type: "Chuyển phôi",
      description: "Chuyển phôi vào tử cung",
      status: "pending"
    }
  ],
  testResults: [
    {
      date: "2024-01-08",
      test: "Hormone AMH",
      result: "2.5 ng/ml",
      status: "Bình thường",
      reference: "1.0 - 4.0 ng/ml"
    },
    {
      date: "2024-01-08",
      test: "FSH",
      result: "6.2 mIU/ml",
      status: "Bình thường",
      reference: "3.5 - 12.5 mIU/ml"
    },
    {
      date: "2024-01-12",
      test: "Số lượng nang trứng",
      result: "8 nang",
      status: "Tốt",
      reference: "> 5 nang"
    }
  ],
  medications: [
    {
      name: "Gonal-F",
      dosage: "75 IU",
      frequency: "1 lần/ngày",
      duration: "10 ngày",
      startDate: "2024-01-05"
    },
    {
      name: "Cetrotide",
      dosage: "0.25mg",
      frequency: "1 lần/ngày",
      duration: "5 ngày",
      startDate: "2024-01-10"
    }
  ]
};

export const TreatmentRecord = () => {
  const [selectedRecord] = useState(mockTreatmentData);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Hoàn thành";
      case "in-progress":
        return "Đang thực hiện";
      case "pending":
        return "Chờ thực hiện";
      default:
        return "Chưa xác định";
    }
  };

  return (
    <div className="space-y-6">
      {/* Patient Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-pink-600">
            <Heart className="w-6 h-6 mr-2" />
            Thông tin điều trị - {selectedRecord.patient.name}
          </CardTitle>
          <CardDescription>
            Phương pháp: {selectedRecord.patient.treatmentType} | 
            Bác sĩ: {selectedRecord.patient.doctor} | 
            Bắt đầu: {selectedRecord.patient.startDate}
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">Tiến trình điều trị</TabsTrigger>
          <TabsTrigger value="tests">Kết quả xét nghiệm</TabsTrigger>
          <TabsTrigger value="medications">Lịch dùng thuốc</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Tiến trình điều trị
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedRecord.timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'completed' ? 'bg-green-500' :
                      item.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{item.type}</h4>
                      <Badge className={getStatusColor(item.status)}>
                        {getStatusText(item.status)}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-1">{item.description}</p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tests">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TestTube className="w-5 h-5 mr-2" />
                Kết quả xét nghiệm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedRecord.testResults.map((test, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{test.test}</h4>
                      <Badge className={
                        test.status === 'Bình thường' || test.status === 'Tốt' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }>
                        {test.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Kết quả</p>
                        <p className="font-medium">{test.result}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Tham chiếu</p>
                        <p className="font-medium">{test.reference}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Ngày xét nghiệm</p>
                        <p className="font-medium">{test.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="w-5 h-5 mr-2" />
                Lịch dùng thuốc
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedRecord.medications.map((med, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{med.name}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Liều dùng</p>
                        <p className="font-medium">{med.dosage}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Tần suất</p>
                        <p className="font-medium">{med.frequency}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Thời gian</p>
                        <p className="font-medium">{med.duration}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Bắt đầu</p>
                        <p className="font-medium">{med.startDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
