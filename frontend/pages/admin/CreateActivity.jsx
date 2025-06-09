import ActivityForm from "../../components/admin/ActivityForm";
import useJoinjoyStore from "../../global-store/joinjoy-store";

const CreateActivity = () => {
  const token = useJoinjoyStore((state) => state.token);

  return (
    <div className="min-h-screen overflow-y-auto p-5 md:p-10 bg-white rounded-md">
      <h1 className="text-3xl font-semibold text-[#0070CC] mb-5">สร้างกิจกรรมของคุณ</h1>
      <ActivityForm mode="create" token={token} />
    </div>
  );
};

export default CreateActivity;