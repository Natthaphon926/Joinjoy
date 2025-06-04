import { useEffect, useState } from "react";
import axios from "axios";

const TreeSelect = ({ onSelect }) => {
  const [trees, setTrees] = useState([]);
  const [selectedTrees, setSelectedTrees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/tree").then((res) => {
      setTrees(res.data);
    });
  }, []);

  const toggleTree = (id) => {
    let newSelected;
    if (selectedTrees.includes(id)) {
      newSelected = selectedTrees.filter((treeID) => treeID !== id);
    } else {
      newSelected = [...selectedTrees, id];
    }
    setSelectedTrees(newSelected);
    onSelect(newSelected);
  };

  return (
    <div className="mt-5">
      <label className="text-sm font-light">
        เลือกต้นไม้ที่จะปลูก <span className="text-[red]">*</span>
      </label>
      <div className="max-h-48 overflow-auto  p-2 rounded">
        {trees.map((tree) => (
          <label key={tree.treeID} className="block cursor-pointer">
            <input
              type="checkbox"
              value={tree.treeID}
              checked={selectedTrees.includes(tree.treeID)}
              onChange={() => toggleTree(tree.treeID)}
              className="mr-2"
            />
            {tree.name} (ลด CO₂ {tree.carbonAbsorption} kg/ปี)
          </label>
        ))}
      </div>
    </div>
  );
};

export default TreeSelect;
