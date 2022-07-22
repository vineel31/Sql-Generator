import React, { useState, useRef, useCallback, useEffect, component } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'react-flow-renderer';
import ButtonEdge from './customedge';
//import ReactFileReader from 'react-file-reader';
// import ConnectionLine from './connections';
// import Sidebar from './sidebar';
//import './index.css';
import DynamicForm from './DynamicForm';
// import axios from 'axios';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Handle } from 'react-flow-renderer';
// import Leftbar from './leftbar';
// import Rightbar from './rightbar';
// import Topbar from './topbar';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { CardHeader, CardMedia, IconButton } from '@mui/material';
// import { DeleteOutlined } from '@mui/icons-material';
// import { CreateFunction } from '@testing-library/react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog'
import JSZip from 'jszip';
//import files from '../resources/apimapping.json';
import { saveAs } from 'file-saver';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
// import generatePythonCode from './generatePythonCode';
//   import Connections from './connections';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
//import generateSQLCode from './sqlcode_generator';
import { fontWeight } from '@mui/system';
//import axios, { post } from 'axios';
//import Papa from "papaparse";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



const SourceNode = () => {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );


  const handleChange = (event) => {
      console.log(event);
      console.log(event.target.files[0]);

      //const url = files.filedata.post;
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        }
      }

    //   post(url, formData, config)
    //   .then((response) => {
    //     console.log(response.data);

        

    //   });

  }
  const card = (
    <React.Fragment>

      <CardContent sx={{ borderRadius: "10px !important", width: 200, height: "100 vh", backgroundColor: " rgb(44,43,73)", padding: "10px", borderpaddingBottom: "10px !important" }}>
        <left>
          <DragIndicatorOutlinedIcon sx={{ fontSize: "15px", position: "absolute", left: "5px", top: "5px", color: "white" }} />
          <Typography fontSize="8px" position="absolute" left="20px" top="8px" color="white">
            File
          </Typography>

        </left>
        <right>
          <ClearOutlinedIcon sx={{ fontSize: "15px", position: "absolute", right: "5px", top: "5px",color:"grey" }} />
        </right>

        <center>
          {/* <Avatar alt="Remy Sharp" src={data.img}  sx={{ width: 40, height: 40 }}> </Avatar> */}

        </center>
        {/* <Typography variant="h6" component="div" color="white">
            {data.name}
            </Typography> */}
        <Typography fontSize={10} color="white">
          <br></br>
          <br></br>
          Drop file here or

          {/* <Button   variant="contained" component="label" color="success">open file here <input type="file" hidden/></Button> */}

          <input type="file" onChange={(event) => handleChange(event)} />

        </Typography>
        <Typography fontSize={10} color="white">
          <br></br>
          Allowed type: csv
        </Typography>

      </CardContent>
    </React.Fragment>
  );
  
    return (


      <>
        <Box sx={{
          maxwidth: 275,
          fontSize: "60%",
          borderRadius: "10px !important",
          maxHeight: "50%",
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          }
        }}>
          <Card sx={{ borderRadius: "10px 0px 0px 10px !important", width: 200, height: "100 vh", backgroundColor: " rgb(44,43,73)", padding: "10px", borderpaddingBottom: "10px !important" }} variant="outlined">{card}
          </Card>


        </Box>

        <Handle
          type="source"
          position="right"
          id="a"
          style={{
            backgroundColor: 'rgb(64, 63, 105)', border: "1px solid #fff",
            borderRadius: "0px 10px 10px 0px",
            height: "100%",
            position: "absolute",
            width: "19px", right: '-20px'
          }}
          isConnectable={true}
        />
      </>
    );
  }

  const destinationNode = ({ data }) => {
    const bull = (
      <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
      >
        •
      </Box>
    );

    const card = (

      <React.Fragment>

        <CardContent sx={{ borderRadius: "10px !important", width: 200, height: "100 vh", backgroundColor: "rgb(44,43,73)", padding: "10px", borderpaddingBottom: "10px !important" }}>
        <left>
          <DragIndicatorOutlinedIcon sx={{ fontSize: "15px", position: "absolute", left: "5px", top: "5px", color: "white" }} />
          <Typography fontSize="8px" position="absolute" left="20px" top="8px" color="white">
            Slice
          </Typography>

        </left>
        <right>
          <ClearOutlinedIcon sx={{ fontSize: "15px", position: "absolute", right: "5px", top: "5px",color:"grey" }} />
        </right>

          <center>
            {/* <Avatar alt="Remy Sharp" src={data.img}  sx={{ width: 40, height: 40 }}> </Avatar> */}

          </center>
          <Typography fontSize={10} color="white">
            x-axis 
            <Select
    
    label="x-axis"
   
  >
    <MenuItem >Col 1</MenuItem>
    <MenuItem >Col 2</MenuItem>
    <MenuItem >Col 3</MenuItem>
  </Select>
          </Typography>
          <Typography fontSize={10} color="white">
          <br></br>
          y-axis 
            <Select
    
    label="x-axis"
   
  >
    <MenuItem >Col 1</MenuItem>
    <MenuItem >Col 2</MenuItem>
    <MenuItem >Col 3</MenuItem>
  </Select>
        </Typography>
        </CardContent>
      </React.Fragment>
    );

    // console.log(data)
    return (
      <>
        <Box sx={{
          maxwidth: 275,
          fontSize: "60%",
          borderRadius: "10px !important",
          maxHeight: "50%",
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          }
        }}>
          <Card sx={{ borderRadius: "0px 10px 10px 0px !important", width: 200, height: "100 vh", backgroundColor: "rgb(44,43,73)", padding: "10px", borderpaddingBottom: "10px !important" }} variant="outlined">{card}
          </Card>


        </Box>

        <Handle
          type="target"
          position="left"
          id="a"
          style={{
            backgroundColor: 'rgb(64, 63, 105)', border: "1px solid #fff",
            borderRadius: "10px 0px 0px 10px",
            height: "100%",
            position: "absolute",
            width: "19px", right: -'20px'
          }}
          isConnectable={true}
        />
      </>
    );
  }

  const mNode = ({ data }) => {
    // console.log(data)
    const card = (
      <React.Fragment>
        <CardHeader
          avatar={
            <Avatar src={data.img} sx={{ bgcolor: red[500] }} aria-label="recipe">

            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={data.name}

        />
        <CardMedia sx={{ paddingLeft: "0px !important", paddingRight: "0px !important", height: "150px" }}
          component="img"
          height="194"
          src="https://www.eaiesb.com/img/about/mule.png"
          alt="Paella dish"
        />
        <CardContent >
          <Typography sx={{ fontSize: "11px" }} variant="body2" color="text.secondary">
            EAIESB solutions-focused approach has resulted in winning awards for EAIESB and its Customers.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </React.Fragment>

    );

    return (
      <>
        <Handle

          type="target"
          position="left"
          // onConnect={(params)=>console.log('handle onConnect',params)}
          id="a"
          style={{
            backgroundColor: 'CadetBlue', border: "1px solid #fff",
            borderRadius: "10px 0px 0px 10px",
            height: "100%",
            position: "absolute",
            width: "19px", left: '-20px'
          }}
          isConnectable={true}
        />
        <>
          <Box sx={{
            maxwidth: 275,
            fontSize: "60%",
            borderRadius: "0px !important",
            maxHeight: "50%",
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            }
          }}>
            <Card sx={{ borderRadius: "0px !important", width: 200, height: "100 vh", backgroundColor: "#bdd5d6" }} variant="outlined">{card}
            </Card>


          </Box>

          <Handle
            type="source"
            position="right"
            id="a"
            style={{
              backgroundColor: 'CadetBlue', border: "1px solid #fff",
              borderRadius: "0px 10px 10px 0px",
              height: "100%",
              position: "absolute",
              width: "19px", right: '-20px'
            }}
            isConnectable={true}
          />
        </>
      </>
    );
  }

  function useForceUpdate() {
    const [yalue, setValue] = useState(0);
    return () => setValue(value => value + 1);
  }


  let id = 0;
  const getId = () => {
    return "id:" + id++
  };
  let fieldId = 0;
  const getFeildId = () => {
    return fieldId++
  }
  const nodeTypes = { source: SourceNode, destination: destinationNode, middle: mNode };
  const getTextBox = (i) => {
    const txt = {
      "id": "name" + i,
      "label": "Column Name",
      "defaultValue": "",
      "type": "text"
    }
    return txt
  }
  const checkbox1 = (i) => {
    const txt = {
      "id": "path" + i,
      "label": "Data Type",
      "defaultValue": "",
      "type": "text"
    }
    return txt
  }
  const checkbox2 = (i) => {
    const txt = {
      "id": "header" + i,
      "label": "Key Type",
      "defaultValue": "",
      "type": "text"
    }
    return txt
  }
 

  const edgeTypes = {
    buttonedge: ButtonEdge,
  };


 


  const Linking = () => {
    const [file, setFile] = useState()
    const [parsedData, setParsedData] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    const [values, setValues] = useState([]);
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [structuredData, setStructuredData] = useState([])
    const [open, setOpen] = React.useState(false);
    const [formState, setFormState] = useState([])
    const [formValues, setFormValues] = useState({})
    const [isViewOnly, setIsViewOnly] = useState(false)
    const [selectedNodeId, setSelectedNodeId] = useState("")
    const [objDataStructure, SetObjDataStructure] = useState({})
    const [projectName, setProjectName] = useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [nodeFormMaping, SetNodeFormMapping] = useState({})
    const forceUpdate = useForceUpdate();
    const [tabname, setTabName] = useState("")
    const [relation, setrelation] = React.useState('')


    const onConnect = useCallback((params) => {
      setEdges((eds) => addEdge({ ...params, type: 'buttonedge' }, eds))
    }, []);
    // const onConnect = (params) => setEdges((eds) => addEdge({ ...params, type: 'buttonedge' }, eds));

    useEffect(() => {
      if (edges.length !== 0) {
        setDataStructure(edges, nodes)
      }
    }, [edges]);
    const setDataStructure = (edges, nodes) => {
      //    console.log("the edges are:",edges)
      //    console.log("the nodes are :",nodes)
      let objList = {}
      for (let node of nodes) {
        let struct = {
          id: node.id,
          name: node.data.name,
          type: node.data.label,
          sources: [],
          targets: [],
          config: objDataStructure[node.id]

        }
        objList[node.id] = struct
      }
      console.log("the objList is :", objList)
      let struct = []
      for (let edge of edges) {
        objList[edge.source].targets.push(objList[edge.target].name)
        objList[edge.target].sources.push(objList[edge.source].name)
        struct[edge.source] = objList[edge.source]
        struct[edge.target] = objList[edge.target]

      }
      let arr = []
      for (let key in struct) {
        arr.push(struct[key])
      }
      console.log("our structure is:", arr)
      setStructuredData(arr)

    }



    const onDragOver = useCallback((event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);
    const onConnectEnd = () => {
    }

    const onDoubleClickOfNode = (node) => {
      setSelectedNodeId(node.id)
      handleOpen()
    }

    /**
* Function to upload file
*/


    const getFormValues = (currFormValues) => {
      let i = 0
      let currObjDataStructure = objDataStructure
      currObjDataStructure[selectedNodeId] = {}
      for (let formObj of formState[selectedNodeId]) {
        currObjDataStructure[selectedNodeId][formObj.id] = currFormValues[i]
        i++
      }
      // console.log(currObjDataStructure)
      SetObjDataStructure(currObjDataStructure)
      setDataStructure(edges, nodes)
    }

    const stateListInitiator = (info, id) => {
      let stateList = []
      let currObjDataStructure = objDataStructure
      currObjDataStructure[id] = {}
      for (let obj of info) {
        const reObj = {
          value: obj.defaultValue
        }
        currObjDataStructure[id][obj.id] = {}
        currObjDataStructure[id][obj.id].value = obj.defaultValue


        stateList.push(reObj)
      }
      SetObjDataStructure(currObjDataStructure)
      return stateList
    }

    const onDrop = useCallback(
      (event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const nodeObjstr = event.dataTransfer.getData('application/reactflow');

        let nodeObj = JSON.parse(nodeObjstr)
        let nodeId = getId()
        let fieldId = getFeildId()
        let dynamicFormPrev = formValues
        let formFeilds = [getTextBox(fieldId), checkbox1(fieldId), checkbox2(fieldId)]
        const type = nodeObj.type

        let inputStatePrev = formState
        inputStatePrev[nodeId] = formFeilds

        setFormState(inputStatePrev)
        dynamicFormPrev[nodeId] = stateListInitiator(formFeilds, nodeId)
        console.log(dynamicFormPrev)
        console.log(inputStatePrev)
        setFormValues(dynamicFormPrev)


        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
          id: nodeId,
          type,
          position,
          data: { label: `${type} node`, name: nodeObj.nodeType, img: nodeObj.img },
        };

        setNodes((nds) => nds.concat(newNode));
      },
      [reactFlowInstance]
    );
    // const stateListInitiator = (info,id) => {
    //     let stateList = []
    //     let currObjDataStructure=objDataStructure
    //     currObjDataStructure[id]={}
    //     for (let obj in info) {
    //       const reObj = {
    //         value: obj.defaultValue
    //       }
    //       currObjDataStructure[id][obj.id]={}
    //       currObjDataStructure[id][obj.id].values=obj.defaultValue


    //       stateList.push(reObj)
    //     }
    //     SetObjDataStructure(currObjDataStructure)
    //     return stateList
    // }

    // const getFormValues = (currFormValues) =>{
    //     let i=0
    //     let currObjDataStructure=objDataStructure
    //     currObjDataStructure[selectedNodeId]={}
    //     for(let formObj of formState[selectedNodeId]){
    //         currObjDataStructure[selectedNodeId][formObj.id]=currFormValues[i]
    //         i++
    //     }
    //     // console.log(currObjDataStructure)
    //     SetObjDataStructure(currObjDataStructure)
    //     setDataStructure(edges,nodes)
    // }

    // const onDoubleClickOfNode =(node)=>{
    //     setSelectedNodeId(node.id)
    //     handleOpen()
    // }

    
    
    const onNameChange = (value) => {
      setTabName(value)
      nodes.map((n) => {
        if (n.id == selectedNodeId) {
          n.data.name = value;
        }
      })
    }
    return (
      <ReactFlowProvider>

        <Box sx={{ flexGrow: 1 }}>
          <div className="dndflow" >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* <Topbar /> */}
              </Grid>
              <Grid item xs={1}>
                {/* <Leftbar /> */}
              </Grid>
              <Grid item xs={10}>


                <div className="reactflow-wrapper" style={{ width: "100%", height: "80vh", backgroundColor: " rgb(59 66 94)" }} ref={reactFlowWrapper}>
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onNodeDoubleClick={(event, node) => onDoubleClickOfNode(node)}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onConnectEnd={onConnectEnd}
                    nodeTypes={nodeTypes}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    edgeTypes={edgeTypes}
                    snapToGrid={true}
                    fitView
                  >
                    <Controls />
                    <Background />
                    <MiniMap style={{ backgroundColor: "#cfcfe2" }} />
                  </ReactFlow>
                </div>




              </Grid>
              <Grid item xs={1}>
                {/* <Rightbar /> */}
              </Grid>

            </Grid>
            <Dialog PaperProps={{
              style: {
                minHeight: '40%',
                maxWidth: '49%',
                backgroundColor: "#f0d2f7",
                backgroundimage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdG1I9EPj2OxBdiaQr1fvpabOhXwyplnQimw&usqp=CAU)",

              }
            }} open={open} onClose={handleClose}>
              <div align="right">
                <CloseIcon onClick={handleClose} />
              </div>
              <DialogTitle><div style={{ fontSize: "1.25vw", textAlign: "center", marginTop: "6px", marginBottom: "8px", marginleft: "23%" }} >
                DESCRIPTION
              </div></DialogTitle>
              <div>
                <TextField
                  sx={{ marginLeft: "33.12%", width: "250px", }}
                  autofocus
                  margin="auto"
                  value={tabname}
                  onChange={(e) => { onNameChange(e.target.value) }}
                  label="Table Name"
                  fullwidth />
              </div>
              <DialogContent>
                <DynamicForm Form={formState[selectedNodeId]}
                  inputStateList={formValues[selectedNodeId]}
                  setInputStateList={getFormValues}
                //  isViewOnlyMode={isViewOnly}
                />

              </DialogContent>
            </Dialog>
            {/* <div>
                    <Button style={{ backgroundColor: "darkmagenta", marginTop:"5%", marginLeft:"40%" }} variant="contained" onClick={()=>addcolumn(selectedNodeId)}>Add Column</Button> 
          </div>
                </Dialog>
                <div>
                  
                <TextField id="outlined-basic" label="Project Name" value={projectName} onChange={(e)=>{setProjectName(e.target.value)}} variant="outlined" />
                </div>
                <div>
                
                <Button style={{ backgroundColor: "#274b4b" }} variant="contained" onClick={generateProject}>Generate Project</Button>
                
                
                </div> */}


          </div>


        </Box>
      </ReactFlowProvider>
    );
  };

  /** 
       * Function to upload file
      */

  export default Linking;