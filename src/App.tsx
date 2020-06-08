/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * App Component
 */
import React from 'react';
import './App.scss';
import addIcon from '../assets/plus-icon.svg';
import { NewEntrySheet, IEntry } from './components/NewEntrySheet';
import { TaskList ,TaskCard} from './components/TaskList';
import { storageKey } from './constants/constants';

const App: React.FC = () => {
    
    const [isEntrySheetOpen, setIsEntrySheetOpen] = React.useState(false);
    const [entries,setEntries] = React.useState<IEntry[]>([]);
    React.useEffect(()=>{
        getTaskEntries();
    },[] );

    const opensheet = () => {
        setIsEntrySheetOpen(true);
    };

    const closeSheet =() =>{
        setIsEntrySheetOpen(false);
    }

    const onAddEntry = (entry:IEntry)=>{
        if(entries){
            const newTasks = [...entries, entry];
            storeEntries(newTasks);
        }
        else{
            storeEntries([entry]);
        }
        closeSheet();
    }

   
    const showmeprogress =()=>{
        let currenttime=0;
        let fulltime=480;
        let nowtime=0;
        entries.forEach((entry:IEntry)  => {
            currenttime+=parseInt(entry.hours)*60;
        });
       entries.forEach((entry:IEntry) => {
           currenttime+=parseInt(entry.minutes);
       });
       nowtime=(currenttime/fulltime)*100;
       nowtime=nowtime>100 ? 100 :nowtime;
       if( currenttime>=fulltime){
           return{   width: `${nowtime}%`,background: 'Green' };
           }
           else if(currenttime <480 && currenttime >=240){
               return {width: `${nowtime}%` , background: 'Yellow'}
           }
           else{
               return {
                width : `${nowtime}%`,background :`rgb(237, 105, 76)`};
               }
           };
           

           const removeit =(id:number)=>{
            if(entries){
                const filteredTasks =entries.filter((entry:IEntry)=>entry.id!==id);
                storeEntries(filteredTasks);
            }
        }
        const getTaskEntries =()=>{
            const entriesString = window.localStorage.getItem(storageKey);
            const entries =entriesString ? JSON.parse(entriesString ): [];
            setEntries(entries);
        }
    
        const storeEntries=(entries:IEntry[])=>{
            window.localStorage.setItem(storageKey,JSON.stringify(entries));
            getTaskEntries();
        }
    
     

    return (
        <div className="app-container">
            <h1>Timesheet</h1>
            <div className="progress-container" >
                <div className="fillprogress"  style={{...showmeprogress()}}>
                </div>
            </div>
            <TaskList>
            {entries.length > 0 ? (
                // <TaskList entries={entries} />
                entries.map((entry: IEntry)=>(
                    <TaskCard key={entry.id} entry={entry} onRemove={()=> removeit(entry.id)}/>
                ))
               
            ) : (
                <p className="empty-text">No entries yet. Add a new entry by clicking the + button.</p>
            )}
            </TaskList>
           
            <button className="floating-add-entry-btn" onClick={opensheet}>
                <img className="add-icon" src={addIcon} alt="add entry" />
            </button>
            {isEntrySheetOpen && <NewEntrySheet onClose={closeSheet} onAdd={onAddEntry} />}
        </div>
    );
};

export default App;
