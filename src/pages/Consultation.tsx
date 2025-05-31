
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Heart, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Consultation = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Cần đăng nhập",
        description: "Vui lòng đăng nhập để gửi câu hỏi tư vấn",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("consultations").insert({
      user_id: user.id,
      subject: subject,
      message: message
    });

    if (error) {
      toast({
        title: "Lỗi gửi tư vấn",
        description: "Không thể gửi câu hỏi. Vui lòng thử lại.",
        variant: "destructive"
      });
      console.error("Consultation error:", error);
    } else {
      toast({
        title: "Gửi tư vấn thành công",
        description: "Câu hỏi của bạn đã được gửi. Chúng tôi sẽ phản hồi trong vòng 24 giờ."
      });
      setSubject("");
      setMessage("");
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
            <h1 className="text-2xl font-bold text-gray-800">Tư vấn miễn phí</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-pink-600" />
              Gửi câu hỏi tư vấn
            </CardTitle>
            <CardDescription>
              Đội ngũ chuyên gia của chúng tôi sẽ tư vấn miễn phí cho bạn trong vòng 24 giờ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Chủ đề</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Ví dụ: Tư vấn về phương pháp IVF"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Nội dung câu hỏi</Label>
                <Textarea
                  id="message"
                  placeholder="Mô tả chi tiết tình trạng, triệu chứng hoặc câu hỏi của bạn..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={8}
                  required
                />
              </div>

              <div className="bg-pink-50 p-4 rounded-lg">
                <h3 className="font-semibold text-pink-800 mb-2">Lưu ý:</h3>
                <ul className="text-sm text-pink-700 space-y-1">
                  <li>• Dịch vụ tư vấn này hoàn toàn miễn phí</li>
                  <li>• Thông tin của bạn được bảo mật tuyệt đối</li>
                  <li>• Chúng tôi sẽ phản hồi trong vòng 24 giờ</li>
                  <li>• Để được tư vấn chi tiết hơn, bạn có thể đặt lịch hẹn trực tiếp</li>
                </ul>
              </div>

              <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={loading}>
                {loading ? "Đang gửi..." : "Gửi câu hỏi"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Consultation;
