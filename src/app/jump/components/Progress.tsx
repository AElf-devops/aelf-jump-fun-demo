import { Progress } from "antd";

// Progress Bar Component
export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="p-5 bg-white rounded-lg mb-5">
      <h3 className="text-[#108ee9] font-bold mb-2">Progress</h3>
      <Progress
        percent={progress}
        status="active"
        strokeColor={{ from: "#108ee9", to: "#87d068" }}
      />
    </div>
  );
}
