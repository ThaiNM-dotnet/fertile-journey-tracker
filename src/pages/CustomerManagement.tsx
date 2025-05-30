
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, User, FileText, Clock, Phone, Mail } from "lucide-react";
import { CustomerList } from "@/components/CustomerList";
import { TreatmentRecord } from "@/components/TreatmentRecord";
import { BookingManagement } from "@/components/BookingManagement";

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quản lý khách hàng</h1>
          <p className="text-gray-600">Theo dõi và quản lý thông tin khách hàng, hồ sơ điều trị và lịch hẹn</p>
        </div>

        <Tabs defaultValue="customers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Danh sách khách hàng
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Hồ sơ điều trị
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Quản lý đặt lịch
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customers">
            <CustomerList />
          </TabsContent>

          <TabsContent value="records">
            <TreatmentRecord />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerManagement;
