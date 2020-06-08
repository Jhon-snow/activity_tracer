/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * TaskList Component - Renders list of task cards of all the tasks entered in timesheet.
 */
import * as React from 'react';
import './styles.scss';
import { IEntry } from '../NewEntrySheet';
import crossIcon from '../../assets/cross-icon.svg';
interface ITaskListProps {
   // entries: IEntry[];
   children: any;
}
interface ITaskCardProps {
    entry: IEntry;
    onRemove: (id: number) => void;
}

export const TaskList: React.FC<ITaskListProps> = (props: ITaskListProps) => {
    const { children } = props;
    return (
        <div className="task-list">{children}
            {/* {entries.map((entry: IEntry,ind) => (
                <TaskCard entry={entry} key={ind}/>
            ))} */}

        </div>
    );
};


export const TaskCard: React.FC<ITaskCardProps> = (props: ITaskCardProps) => {
    const {
        entry: { task, hours, minutes ,remarks,id},
        onRemove,
    } = props;

    const deletecard = () => onRemove(id);
    return (
        <div className="task-card">
            
                <button className="removebutton" onClick={deletecard} >
                    <img src={crossIcon} className="picture" alt=" cross butoon" ></img>
                </button>
            

            <div className="flex1">
            <div className="task-title">{task}</div>
            <div className="task-time">{`${hours}h ${minutes}m`}</div>
            </div>
            

            <div className="task-remarks">
             <p>{remarks}</p>
             </div>       
         </div>
        
    );
};
