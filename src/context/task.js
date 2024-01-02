// Task lari Tek Bir Merkezden Yonetmek Icin
// React Library Icindeki createContext Paketini Kullaniyoruz
import { createContext } from 'react';
import { useState } from 'react';
import Axios from 'axios';

// Task Yonetimini Daha Kolay Hale Getirmek Icin
// createContext Objesi Olusturup Bunu
// Degiskene Atama Yapiyoruz
const TasksContext = createContext();

// Task Yonetiminde Yapilacak Islemleri 
// Provider Fonksiyonu Icinde Yapiyoruz
function Provider({ children }) {
  const [tasks, setTasks] = useState([]);

  /* TaskCreate.js Dosyasinda 
      handleSubmit Fonksiyonundaki
      title ve taskDecription Degiskenlerindeki Degerleri Aliyoruz */
  const createTask = async (title, taskDescription) => {
    debugger;

    // Database e Baglaniyoruz
    const response = await Axios.post('http://localhost:3004/tasks', {

      // id Data si Otomatik Olarak Verilmesini Istedigimiz Icin
      // id Parametresini Yazmiyoruz
      // Database Hangi Data larin Gonderilecegini Belirtiyoruz
      title,
      taskDescription,
    });
    console.log(response);

    // Olusturulacak Task Icin Gerekli Bilgileri Duzenliyoruz
    // Ayni Zamanda Girilen Her Task Bilgisini Ve 
    // En Son Girilen Task Bilgisini Tutuyoruz
    const createdTasks = [
      
      // Olusturulan Task Icin 
      // Ilk Olarak Array Tipi Oldugunu Belirtiyoruz
      ...tasks, 
      response.data
    ];

    // Girilen Tum Task Bilgilerini Aliyoruz
    // Ve Bu Fonksiyon Icindeki tasks Degiskenine Atama Yapiyoruz
    setTasks(createdTasks);
  };

  // Data nin Alinacagi Database e Baglaniyoruz
  const fetchTasks = async () => {
    const response = await Axios.get('http://localhost:3004/tasks');
    debugger;
    setTasks(response.data);
  };

  // Eklenen Task lar Icinde id Parametresi Uzerinden
  // Task Bilgisini Aliyoruz
  const deleteTaskById = async (id) => {
    await Axios.delete(`http://localhost:3004/tasks/${id}`);

    // filter Fonksiyonu Ile Silme Isleminden Sonra
    const afterDeletingTasks = tasks.filter((task) => {

      // Silinen Task in id Bilgisi Task Listin Icinde Yoksa
      // Task lari Farkli Bir Array Icine Aliyoruz
      return task.id !== id;
    });

    // filter Fonksiyonu Ile Silme Isleminden Sonra
    // Task larin Bulundugu Array i
    // afterDeletingTasks Degiskenini Parametre Olarak Verip
    // setTasks Uzerinden tasks Degiskenine Atama Yapiyoruz
    setTasks(afterDeletingTasks);
  };

  // id Bilgisi Uzerinden Guncellenen Task Bilgilerini Aliyoruz
  const editTaskById = async (id, updatedTitle, updatedTaskDescription) => {
    await Axios.put(`http://localhost:3004/tasks/${id}`, {
      title: updatedTitle,
      taskDescription: updatedTaskDescription,
    });

    // tasks Degiskeni Uzerinden Gelen 
    // Task in Update Edilmis Halini 
    // map Fonksiyonu Ile Tarama Yapiyoruz
    const updatedTasks = tasks.map((task) => {

      // Update Edilmek Istenilen Task Bilgisi Daha Onceden Var Olan Bilgi Ise
      if (task.id === id) {

        // Update Edilen Task Bilgilerini id Bilgisi Uzerinden
        // Onceki Taks Bilgilerini Update Edilmis Hali Ile Degistiriyoruz
        return { id, title: updatedTitle, taskDescription: updatedTaskDescription };
      }

      // Task in Update Edilmis Halini Donduruyoruz
      return task;
    });

    // Task in Update Edilmis Halini
    // setTasks Degiskenine 
    // updatedTasks Degiskenini Parametre Olarak Veriyoruz
    setTasks(updatedTasks);
  };

  // Projede Yer Alan Task lari Tek Merkezden Yonetmek Icin
  // Task Isimlerinden Bir Array Olusturuyoruz
  // Olusturulan Array Icinde Projede Kullanilan
  // Task Isimlerini Yaziyoruz
  const sharedValuesAndMethods = {
    tasks,
    createTask,
    fetchTasks,
    editTaskById,
    deleteTaskById,
  };
  return (

    // TaksContext Componentinin Provider i Uzerinden
    // Erisimi Kontrol Ediyoruz
    // TaksContext Componentinin Icinde Yazilanlar Projenin Hepsinde Erisilebilir Hale Geliyor
    <TasksContext.Provider value={sharedValuesAndMethods}>
      {children}
    </TasksContext.Provider>
  );
}

export { Provider };
export default TasksContext;