import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50">
    <td className="p-4 align-middle">{props.record.name}</td>
    <td className="p-4 align-middle">{props.record.position}</td>
    <td className="p-4 align-middle">{props.record.level}</td>
    <td className="p-4 align-middle">
      <div className="flex gap-2">
        <Link
          to={`/edit/${props.record._id}`}
          className="inline-flex items-center justify-center border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
        >
          Edit
        </Link>
        <button
          onClick={() => props.deleteRecord(props.record._id)}
          className="inline-flex items-center justify-center border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/record`);
        if (!response.ok) {
          console.error(`Failed to fetch records: ${response.statusText}`);
          return;
        }
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error(`An error occurred: ${error.message}`);
      }
    }

    fetchRecords();
  }, []);

  async function deleteRecord(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/record/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.error(`Failed to delete record: ${response.statusText}`);
        return;
      }
      setRecords((prevRecords) => prevRecords.filter((record) => record._id !== id));
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
    }
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Employee Records</h3>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Position</th>
              <th className="p-4 text-left">Level</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>{records.map((record) => (
            <Record key={record._id} record={record} deleteRecord={deleteRecord} />
          ))}</tbody>
        </table>
      </div>
    </>
  );
}
