
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./singleRoom.css"
import CheckIcon from '@material-ui/icons/Check';
import { Divider } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { TextField } from '@material-ui/core';

const purple = "#6200EE"
function SingleRoom(props) {
  
  const [createOwnSectionTitle, setcreateOwnSectionTitle] = useState("");
  const [selectedSection, setSelectedSection] = useState(-1);
  const [isCreatingOwnSection, setCreatingOwnSection] = useState(false);
  const [selectedSectionItems, setSelectedSectionItems] = useState([]);
  const renderSelection = () => {
    return (
      <div className="roomReservationSelectionComponent">
        
        <div className={selectedSection === -2 ? "roomReservationSelectedSection" : "roomReservationSection"} onClick={() => handleSectionClick(-2, props.room.items)}> 
        <Paper className="roomReservationPaper" elevation={3}>
              <div className="roomReservationSectionHeader">
                <Typography variant="h4" component="h4">
                  Hele rommet
                </Typography>
                {selectedSection === -2 ? <CheckIcon style={{ color: purple }}/> : <CheckIcon color="disabled" />}
              </div>
              <div className="roomReservationSectionItems">
                {renderSectionItems(props.room.items, (selectedSection === -2))} 
              </div>
              
              
              <div className="hr">
                <Divider flexItem/>
              </div>
              
        </Paper>
      
        </div>
    
          {renderSections()}
          
       
        
        
        {renderCreateOwnSection()}
        <div className="roomReservationReserveButton">
          <Button variant="contained" style={{ background: purple, color: "#FFFFFF" }}>RESERVE</Button>
        </div>
        
      </div>
    )}

  const renderSections = () => {
    let elements = [];
    props.room.sections.forEach(section => {
      elements.push(
        <div key={uuid()} className={selectedSection === section.id ? "roomReservationSelectedSection" : "roomReservationSection"} onClick={() => handleSectionClick(section.id, section.items)}> 
          <Paper className="roomReservationPaper" elevation={3}>
          <div className="roomReservationSectionHeader">
            <Typography variant="h4" component="h4">
            {section.name}
            </Typography>
            {selectedSection === section.id ? <CheckIcon style={{ color: purple }}/> : <CheckIcon color="disabled" />}
          </div>
          
          {renderSectionItems(section.items, (selectedSection === section.id))}
          <div className="hr">
                <Divider flexItem/>
              </div>
          </Paper>
        </div>
      )
    })
    return elements
  }

  const renderSectionItems = (items, selected) => {
    return items.map(item => {
      return <div className={selected ? "selectedItem" : "unselectedItem"} key={uuid()} >{item.name}</div>
    })
  }

  const renderCreateOwnSection = () => {
    if(!isCreatingOwnSection){
      return <div className="roomReservationSection" onClick={() => {
        setCreatingOwnSection(true)
        setSelectedSectionItems([])
        setSelectedSection(-1)
      }
      }>
        <Typography variant="h4" component="h4">
        Lag egen seksjon
        </Typography>
        </div>
    }
    else return (
      <div className="roomReservationSection">
        <div onClick={() => setCreatingOwnSection(false)}>
          <Typography variant="h4" component="h4">
            Lag egen seksjon
        </Typography>
        </div>
        <div className="roomReservationCreateOwnSectionItems">
          {renderCreateOwnSectionItems()}
          
          {renderSelectedItems()}
        </div>
        <div className="roomReservationCreateOwnSectionTitle" >
          <TextField fullWidth id="outlined-basic" label="Tittel" variant="outlined"  helperText="Beskrivende tittel for din egen seksjon" onChange={(event) => setcreateOwnSectionTitle(event.target.value)}/>
        
        </div>
      </div>
    )

  }
  
  const renderCreateOwnSectionItems = () => {
    return <div className="createOwnSectionItems">
      {props.room.items.map(item => {
      if(!selectedSectionItems.some(selectedItem => item.itemId === selectedItem.itemId)) return <div className="unselectedItem" key={uuid()} onClick={() => handleItemSelection(item)}>{item.name}</div>
    })}
    </div>
  }
  const renderSelectedItems = () => {
    return <div className="selectedCreateOwnSectionItems">
      {selectedSectionItems.map(item => {
      return <div className="selectedItem" key={uuid()} onClick={() => handleItemSelection(item)}>{item.name}<CheckIcon fontSize="small" style={{ color: "#FFFFFF"}}/></div>})}
    </div>
    
  }

  const handleSectionClick = (id, items) => {
    setSelectedSection((selectedSection) => {
      return selectedSection===id ? -1: id
    })
    setSelectedSectionItems((selectedSectionItems) => {
      return selectedSection===id ? []: items
    })
    setCreatingOwnSection(false)
  }

  

  const handleItemSelection = (item) => {
    setSelectedSectionItems((selectedSectionItems) => {
      return selectedSectionItems.includes(item) ? selectedSectionItems.filter(selectedItem => selectedItem!= item): [...selectedSectionItems, item]
    })
  }
  

  return (
      <div className="singleRoom">
        <div className="RoomDetails">
          <div>
            <Typography variant="h2" component="h2">
            {props.room.name}
            </Typography>
          </div>
        </div>
      
        <div className="RoomDescription">
          <Typography variant="subtitle1" color="textSecondary">
              {props.room.description}
          </Typography>
        </div>
        
      {renderSelection()}
    </div>
  );
}

export default SingleRoom;