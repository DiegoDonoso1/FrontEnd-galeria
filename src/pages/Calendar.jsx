import { useState, useEffect } from "react";
import Modal from "../components/ModalCalendar";
import { getDay } from "../services/GalleryService";
import Toast from "../components/Toast";
import { Link } from "react-router-dom";

export default function Calendar(username) {
  const [diasAbiertos, setDiasAbiertos] = useState([]);
  const [clickedDay, setClickedDay] = useState(null);
  const [showNextMonth, setShowNextMonth] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDayDetails, setModalDayDetails] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Cargar los días abiertos desde localStorage al montar el componente
  useEffect(() => {
    const storedDiasAbiertos =
      JSON.parse(localStorage.getItem("diasAbiertos")) || [];
    setDiasAbiertos((prevDiasAbiertos) => {
      // Actualizar el estado solo si hay datos almacenados
      return storedDiasAbiertos.length > 0
        ? storedDiasAbiertos
        : prevDiasAbiertos;
    });
  }, []);

  // Guardar los días abiertos en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("diasAbiertos", JSON.stringify(diasAbiertos));
  }, [diasAbiertos]);

  const today = new Date();
  const isMobile = window.innerWidth <= 768; // Ajusta según tus necesidades

  const handleDayClick = async (selectedDate) => {
    const currentMonth = today.getMonth() + 1;
    const selectedDay = selectedDate.getDate();

    // Verificar que el día esté dentro del mes actual y sea pasado o igual al día actual
    if (
      selectedDate.getMonth() + 1 === currentMonth &&
      selectedDay <= today.getDate()
    ) {
      try {
        // Obtener los detalles del evento
        const eventDetails = await getDay(selectedDay);
        if (eventDetails !== null) {
          // Mostrar los detalles del evento en el modal
          setClickedDay(selectedDay);
          setModalDayDetails({
            title: `Día ${selectedDay} de ${getMonthFromDate(selectedDate)}`,
            imagePath: eventDetails.data.imagePath || "url_default_imagen",
            description:
              eventDetails.data.description || "Descripción por defecto",
          });
          openModal();

          // Agregar el día al estado y al localStorage solo si no está en la lista
          if (!diasAbiertos.includes(selectedDay)) {
            setDiasAbiertos((prevDiasAbiertos) => [
              ...prevDiasAbiertos,
              selectedDay,
            ]);
            localStorage.setItem(
              "diasAbiertos",
              JSON.stringify([...diasAbiertos, selectedDay])
            );
          }
        } else {
          // Manejar el caso donde no hay datos para el día
          setToastMessage("Aún no está disponible la foto de hoy 😔");
          setShowToast(true);
          setTimeout(() => {
            setToastMessage("");
          }, 3000);
        }
      } catch (error) {
        // Manejar el error, por ejemplo, mostrar un mensaje de error en el modal
        console.error("Error al obtener detalles del evento:", error);
      }
    } else {
      // Manejar el caso donde el día no está permitido
      setToastMessage("Todavía no se puede mostrar este día 😔");
      setShowToast(true);
      setTimeout(() => {
        setToastMessage("");
      }, 3000);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getMonthFromDate = (date) => {
    return date.toLocaleString("default", { month: "long" });
  };

  const renderDays = (start, end) => {
    const days = [];
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    let startDay;
    let endDay;

    if (currentMonth === 0) {
      // Enero
      startDay = start; // Comienza en el día que se pasa como argumento
      endDay = end; // Termina en el día que se pasa como argumento
    } else if (currentMonth === 1) {
      // Febrero
      startDay = start; // Comienza en el día que se pasa como argumento
      endDay = end; // Termina en el día que se pasa como argumento
    } else {
      // Otros meses
      startDay = 1; // Comienza en el día 1
      endDay = new Date(currentYear, currentMonth + 1, 0).getDate(); // Termina en el último día del mes
    }

    for (let i = startDay; i <= endDay; i++) {
      const nextDay = new Date(currentYear, currentMonth, i);

      days.push(
        <div
          key={i}
          onClick={() => handleDayClick(nextDay)}
          className={`border border-pink-100 text-center cursor-pointer p-4 sm:p-8 rounded overflow-hidden relative group ${
            diasAbiertos.includes(i) ? "bg-purple-200" : ""
          } ${i === clickedDay ? "bg-blue-100" : ""}`}
        >
          <div className="flex items-center justify-center text-gray-600">
            {i}
          </div>
        </div>
      );
    }

    return days;
  };

  const renderMobileCalendar = () => {
    // Rango de fechas para la primera mitad (enero del 18 al 31)
    const firstHalfDays = renderDays(18, 31);

    // Rango de fechas para la segunda mitad (febrero del 1 al 17)
    const secondHalfDays = renderDays(1, 17);

    return (
      <div>
        <h3 className="text-lg font-semibold mb-2 text-center text-purple-900">
          {getMonthFromDate(today).charAt(0).toUpperCase() +
            getMonthFromDate(today).slice(1)}
        </h3>
        <div className="grid grid-cols-7 gap-2 sm:w-1/2 mx-auto ">
          {["Jue", "Vie", "Sáb", "Dom", "Lun", "Mar", "Mié"].map((dia) => (
            <div key={dia} className="text-center font-semibold">
              {dia}
            </div>
          ))}
          {firstHalfDays}
        </div>
        <div className="flex items-center justify-center my-8 ">
          <div className="w-36 h-0.5  bg-purple-200"></div>
        </div>
        {showNextMonth && (
          <>
            <h3 className="text-lg font-semibold mb-2 text-center mt-4 text-purple-900">
              {getMonthFromDate(
                new Date(today.getFullYear(), today.getMonth() + 1)
              )
                .charAt(0)
                .toUpperCase() +
                getMonthFromDate(
                  new Date(today.getFullYear(), today.getMonth() + 1)
                ).slice(1)}
            </h3>
            <div className="grid grid-cols-7 gap-2 sm:w-1/2 mx-auto mt-2">
              {["Jue", "Vie", "Sáb", "Dom", "Lun", "Mar", "Mié"].map((dia) => (
                <div key={dia} className="text-center font-semibold ">
                  {dia}
                </div>
              ))}
              {secondHalfDays}
            </div>
          </>
        )}
        <div className="text-center mt-4">
          <button
            onClick={() => setShowNextMonth(!showNextMonth)}
            className="text-white font-semi-bold bg-[#6A64F1] py-2 px-4 rounded border border-[#6A64F1]"
          >
            {showNextMonth ? "Ocultar" : "Mostrar más"}
          </button>
        </div>
      </div>
    );
  };

  const renderDesktopCalendar = () => {
    return (
      <div className="grid grid-cols-7 gap-2 sm:w-1/2 mx-auto">
        {["Jue", "Vie", "Sáb", "Dom", "Lun", "Mar", "Mié"].map((dia) => (
          <div key={dia} className="text-center font-bold">
            {dia}
          </div>
        ))}
        {renderDays(0, 31)}
      </div>
    );
  };

  return (
    <div className="container bg-white p-4 mt-4 rounded shadow-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-purple">
        Calendario
      </h2>
      {isMobile ? renderMobileCalendar() : renderDesktopCalendar()}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        dayDetails={modalDayDetails}
      />
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />

      {username.username === "diego" && <Link to="/formCalendar">agregar</Link>}
    </div>
  );
}
