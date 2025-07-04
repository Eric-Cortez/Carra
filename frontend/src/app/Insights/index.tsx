import type React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loadQuestionsAsync } from "@/features/questions/questionSlice";
import { loadTopicsAsync } from "@/features/topics/topicSlice";
import type { RootState } from "@/app/store";
import { Question } from "@/features/questions/questionSlice"; // Add this import
import {
  Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Line, LineChart, Tooltip, Cell
} from 'recharts';
import {
  ChartContainer, ChartTooltip, ChartTooltipContent
} from "@/components/ui/chart";

const Insights: React.FC = () => {
  const dispatch = useAppDispatch();
  const { questions, status, error }: { questions: Question[], status: "idle" | "loading" | "failed", error: string | null } = useAppSelector(
    (state: RootState) => state.questions,
  );
  const { topics } = useAppSelector((state: RootState) => state.topics);

  useEffect(() => {
    dispatch(loadQuestionsAsync());
    dispatch(loadTopicsAsync());
  }, [dispatch]);

  const getQuestionsPerTopicData = () => {
    if (!questions.length || !topics.length) return [];
    return topics.map(topic => ({
      name: topic.name,
      questions: questions.filter(q => q.topicId === topic.id).length,
    })).filter(item => item.questions > 0);
  };

  const getRecentActivityData = () => {
    if (!questions.length) return [];
    const activity = questions.reduce((acc: Record<string, number>, q: Question) => {
      const date = new Date(q.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(activity)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const questionsPerTopicData = getQuestionsPerTopicData();
  const recentActivityData = getRecentActivityData();

  const chartColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const barChartConfig = {
    questions: { label: "Questions", color: chartColors[0] },
  };
  const pieChartConfig = {
    questions: { label: "Questions" },
    ...questionsPerTopicData.reduce((acc, item, index) => {
      acc[item.name] = { label: item.name, color: chartColors[index % chartColors.length] };
      return acc;
    }, {} as any)
  };

  return (
    <div className="p-6 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Insights Dashboard</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
        <div className="p-4 border rounded-lg flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Questions per Topic</h2>
          <ChartContainer config={barChartConfig} className="flex-grow w-full">
            <BarChart accessibilityLayer data={questionsPerTopicData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Bar dataKey="questions" fill="var(--color-questions)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="p-4 border rounded-lg flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Top Topics</h2>
          <ChartContainer config={pieChartConfig} className="flex-grow w-full">
            <PieChart>
              <Tooltip
                content={
                  <ChartTooltipContent
                    nameKey="name"
                    formatter={(value, name) => {
                      const total =
                        questionsPerTopicData.reduce(
                          (acc, item) => acc + item.questions,
                          0,
                        ) || 1
                      const percentage = ((value as number / total as number) * 100).toFixed(0)
                      return (
                        <div className="flex min-w-[120px] items-center justify-between">
                          <span className="capitalize text-muted-foreground">
                            {name}
                          </span>
                          <span className="font-bold">
                            {value} ({percentage}%)
                          </span>
                        </div>
                      )
                    }}
                  />
                }
              />
              <Pie
                data={questionsPerTopicData}
                dataKey="questions"
                nameKey="name"
                innerRadius={60}
              >
                {questionsPerTopicData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
        <div className="p-4 border rounded-lg col-span-1 md:col-span-2 flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
          <ChartContainer config={{ count: { label: "Questions", color: chartColors[1] } }} className="flex-grow w-full">
            <LineChart data={recentActivityData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis />
              <Tooltip content={<ChartTooltipContent indicator="dot" />} />
              <Line dataKey="count" type="monotone" stroke="var(--color-count)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default Insights;
