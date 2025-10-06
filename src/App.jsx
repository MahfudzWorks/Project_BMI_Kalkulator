import { useState } from "react";
import { Moon, Sun } from "lucide-react"; // ikon dari lucide-react

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!weight || !height) return;

    const h = height / 100;
    const bmiValue = (weight / (h * h)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setStatus("Kurus");
    else if (bmiValue < 25) setStatus("Normal");
    else if (bmiValue < 30) setStatus("Gemuk");
    else setStatus("Obesitas");

    const minIdeal = (18.5 * h * h).toFixed(1);
    const maxIdeal = (24.9 * h * h).toFixed(1);
    setSuggestion(
      `Berat badan ideal untuk tinggi ${height} cm adalah antara ${minIdeal} kg dan ${maxIdeal} kg.`
    );
  };

  const resetForm = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setStatus("");
    setSuggestion("");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-gray-100"
          : "bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 text-gray-900"
      }`}
    >
      <div
        className={`shadow-2xl rounded-2xl p-6 w-full max-w-sm text-center transition-all duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header + Tombol Dark Mode */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">🧮 BMI Kalkulator</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Form Input */}
        <form onSubmit={calculateBMI} className="space-y-4">
          <div>
            <label className="block text-left mb-1 font-medium">
              Berat Badan (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Contoh: 60"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring 
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
              }`}
            />
          </div>

          <div>
            <label className="block text-left mb-1 font-medium">
              Tinggi Badan (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Contoh: 170"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring 
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500"
                  : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-all duration-200"
          >
            Hitung BMI
          </button>

          <button
            type="button"
            onClick={resetForm}
            className={`w-full py-2 rounded-lg font-medium transition-all duration-200 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            Reset
          </button>
        </form>

        {/* Hasil */}
        {bmi && (
          <div
            className={`mt-6 p-4 rounded-xl shadow-inner animate-fade-in ${
              darkMode ? "bg-gray-700" : "bg-blue-50"
            }`}
          >
            <p className="text-lg font-semibold">
              BMI Anda: <span className="text-blue-400 font-bold">{bmi}</span>
            </p>
            <p className="text-sm mb-2">Status: {status}</p>

            <div
              className={`p-3 rounded-lg text-sm border shadow-sm ${
                darkMode
                  ? "bg-gray-800 border-gray-600 text-gray-200"
                  : "bg-white border-blue-100 text-gray-700"
              }`}
            >
              💡 <span className="font-medium">Saran:</span> {suggestion}
            </div>
          </div>
        )}

        <p
          className={`mt-6 text-xs ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          *BMI hanya indikator umum, bukan ukuran pasti kesehatan.
        </p>
      </div>
    </div>
  );
}

export default App;
