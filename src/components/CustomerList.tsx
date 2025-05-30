
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, User, Phone, Mail, Edit, Eye } from "lucide-react";

const mockCustomers = [
  {
    id: 1,
    name: "Nguyễn Thị Mai",
    phone: "0901234567",
    email: "mai.nguyen@email.com",
    age: 32,
    status: "Đang điều trị",
    treatment: "IVF",
    doctor: "BS. Trần Văn A",
    lastVisit: "2024-01-15"
  },
  {
    id: 2,
    name: "Lê Thị Hoa",
    phone: "0907654321",
    email: "hoa.le@email.com",
    age: 28,
    status: "Hoàn thành",
    treatment: "IUI",
    doctor: "BS. Nguyễn Thị B",
    lastVisit: "2024-01-10"
  },
  {
    id: 3,
    name: "Phạm Thị Lan",
    phone: "0912345678",
    email: "lan.pham@email.com",
    age: 35,
    status: "Tư vấn",
    treatment: "Chưa xác định",
    doctor: "BS. Trần Văn A",
    lastVisit: "2024-01-12"
  }
];

export const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers] = useState(mockCustomers);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đang điều trị":
        return "bg-blue-100 text-blue-800";
      case "Hoàn thành":
        return "bg-green-100 text-green-800";
      case "Tư vấn":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Tìm kiếm theo tên, số điện thoại hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700">
          <User className="w-4 h-4 mr-2" />
          Thêm khách hàng
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <User className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{customer.name}</h3>
                      <p className="text-sm text-gray-500">Tuổi: {customer.age}</p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {customer.email}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Phương pháp: {customer.treatment}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Bác sĩ phụ trách: {customer.doctor}</p>
                      <p>Lần khám gần nhất: {customer.lastVisit}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Xem chi tiết
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">
              Không tìm thấy khách hàng
            </h3>
            <p className="text-gray-400">
              Thử thay đổi từ khóa tìm kiếm hoặc thêm khách hàng mới
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
