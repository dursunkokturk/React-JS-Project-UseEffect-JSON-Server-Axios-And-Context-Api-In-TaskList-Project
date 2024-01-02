import './App.css';

// Task Create Sablonunu Ekrana Yazdirmak Icin
// TaskCreate.js Dosyasini Import Ediyoruz
import TaskCreate from './components/TaskCreate';

// Task Listesini Yazdirmak Icin
// TaskList.js Dosyasini Import Ediyoruz
import TaskList from './components/TaskList';

// React Library Icindeki 
// useEffect Ve useContext Paketlerini Import Ediyoruz
import { useEffect, useContext } from 'react';

// useContext Paketinin Icinden 
// Kodlayan Kisi Tarafindan Olusturulan
// Context Paketini Import Ediyoruz
import TasksContext from './context/task';

function App() {

  // Kodyalan Kisi Tarafindan Olusturlan Context Paketi Icinden
  // Proje Kullanilacak fetchTasks Paketini Kullaniyoruz
  const { fetchTasks } = useContext(TasksContext);

  // Var Data yi Database den Aliyoruz
  useEffect(() => {

    // Database Icindeki Data yi 
    // fetchTasks Metodu Ile Cagiriyoruz
    fetchTasks();

    // App Componentinin Sadece Baslangicta Gorunmesi Icin
    // Bos Array Olusturuyoruz
  }, []);

  return (
    <div className="App">

      {/* Task Creaate Sablonunu Ekrana Yazdiriyoruz */}
      {/* TaskCreate.js Dosyasinda handleSubmit Fonksiyonundaki
          title ve taskDecription Degiskenlerindeki Degerleri Aliyoruz*/}
      <TaskCreate />
      <h1>Tasks</h1>

      {/* TaskList.js Dosyasinda Yapilan Listeleme Isleminde
          Eklenen Tasklari Listeliyoruz */}
      <TaskList />
    </div>
  );
}

export default App;