import TaskShow from './TaskShow';

// React Library Icindeki 
// useEffect Ve useContext Paketlerini Import Ediyoruz
import { useContext } from 'react';

// useContext Paketinin Icinden 
// Kodlayan Kisi Tarafindan Olusturulan
// Context Paketini Import Ediyoruz
import TasksContext from '../context/task';

// App.js Dosyasindaki tasks Degiskeni Uzerinden
// Girilen Task Bilgilerinin Oldugu Task Bilgilerini 
// tasks Parametresi Uzerinden Aliyoruz
function TaskList() {
  const { tasks } = useContext(TasksContext);
  return (
    <div className="task-list">

      {/* tasks Degiskeni Uzerinden Gelen Array Icindeki Bilgileri
          map Fonksiyonu Ile Geziyoruz */}
      {tasks.map((task, index) => {

        // key Ve value Degerlerine Gore Ekrana Yazdiriyoruz
        // Girilen Task a Verilen id Bilgisini onDelete Metoduna Veriyoruz
        // TaskShow.js Dosyasinda 
        // TaskShow Props unda Yapilan 
        // Delete Ve Update Islemlerinin Sonucunu
        // indis Numarasi Uzerinden Listeliyoruz
        return <TaskShow key={index} task={task} />;
      })}
    </div>
  );
}

export default TaskList;