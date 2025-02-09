/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ExpandedRowContentProps<TData> {
  data: TData;
  renderContent: (data: TData) => React.ReactNode;
}

const ExpandedRowContent = <TData,>({
  data,
  renderContent,
}: ExpandedRowContentProps<TData>) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">
          {(data as any).title || "Details"}
        </CardTitle>
        <CardDescription>{(data as any).genre || ""}</CardDescription>
      </CardHeader>
      <CardContent>{renderContent(data)}</CardContent>
    </Card>
  );
};

export default ExpandedRowContent;
