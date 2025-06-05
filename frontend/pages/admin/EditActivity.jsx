import { useParams } from "react-router-dom";
import ActivityForm from "../../components/admin/ActivityForm";
import useJoinjoyStore from "../../global-store/joinjoy-store";

const EditActivity = () => {
  const token = useJoinjoyStore((state) => state.token);
  const { id } = useParams();

  return (
    <div className="p-10 bg-white rounded-md">
      <h1 className="text-3xl font-semibold text-[#0070CC] mb-5">แก้ไขกิจกรรม</h1>
      <ActivityForm mode="edit" activityID={id} token={token} />
    </div>
  );
};

export default EditActivity;
