import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
  const [form, setForm] = useState({ name: "", position: "", level: "" });
  const [isNew, setIsNew] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    async function fetchRecord() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/record/${id}`);
        if (!response.ok) {
          console.error(`Failed to fetch record: ${response.statusText}`);
          navigate("/");
          return;
        }
        const record = await response.json();
        setForm(record);
        setIsNew(false);
      } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        navigate("/");
      }
    }

    fetchRecord();
  }, [id, navigate]);

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const method = isNew ? "POST" : "PATCH";
      const url = isNew
        ? `${import.meta.env.VITE_API_URL}/record`
        : `${import.meta.env.VITE_API_URL}/record/${id}`;
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        console.error(`Failed to save record: ${response.statusText}`);
        return;
      }
      navigate("/");
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold">Create/Update Employee Record</h3>
      <div className="grid gap-4 mt-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => updateForm({ name: e.target.value })}
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          placeholder="Position"
          value={form.position}
          onChange={(e) => updateForm({ position: e.target.value })}
          className="w-full border rounded p-2"
        />
        <select
          value={form.level}
          onChange={(e) => updateForm({ level: e.target.value })}
          className="w-full border rounded p-2"
        >
          <option value="">Select Level</option>
          <option value="Intern">Intern</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Save
        </button>
      </div>
    </form>
  );
}
