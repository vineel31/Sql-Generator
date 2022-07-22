import React, { useState, useRef, useCallback, useEffect } from 'react';
import useGenerateRandomColor  from "./useGenerateRandomColor";
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Handle,
    useNodes,
    useEdges
} from 'react-flow-renderer';
import EditIcon from '@mui/icons-material/Edit';
import randomColor from "randomcolor";
import KeyIcon from '@mui/icons-material/Key';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DynamicForm from './DynamicForm';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import generatePythonCode from './generatePythonCode';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import AddIcon from '@mui/icons-material/Add';
import TableHead from '@mui/material/TableHead';
import './index1.css'

//import index1 from './index1.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions, TableCell, TableRow } from '@mui/material';
import { style } from '@mui/system';


let color = randomColor();
let color1 = randomColor();
const sourceNode = ({ data }) => {
    return (
        <>
            <Box sx={{ minWidth: 75 ,minheight: 40 ,border: 3,borderColor: color ,borderRadius: 2 }}>
                <Card variant="outlined" >
                <CardHeader  style={{backgroundColor: color,border: 1,borderColor: "red",borderRadius: 2,borderTopRightRadius:"80px 80px",borderBottomRightRadius:"80px 80px" }} />
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                <div style={{color:color,fontSize:"30"}}>
                                {data.label}
                                <span style={{position:'absolute',right:'20px'}}><AddIcon color='secondary' fontSize='large'/></span>
                                </div> 
                            </Typography>
                            <Typography sx={{ fontSize: 30 }} style={{color:color}} gutterBottom>
                                {data.name}
                                <span style={{position:'absolute',right:'20px'}}><EditIcon color='secondary' fontSize='large'/></span>
                                <Grid>
                                    <div style={{}}>
                                <TextField style={{padding:"2px" ,position:"left"}} id="outlined-helperText" label="Attribute" defaultValue="id"/>
                                <TextField style={{padding:"2px" ,position:"left"}} id="outlined-multiline-flexible" label="type" value="int" multiline maxRows={2}/>
                                 <span style={{position:"ceter"}}><KeyIcon color='secondary' fontSize='large'/></span>
                                </div>
                                <div style={{display:'flex',marginTop:"2px"}}>
                                <TextField style={{padding:"2px" ,position:"left"}} id="outlined-helperText" label="Attribute" defaultValue="id"/>
                                <TextField style={{padding:"2px" ,position:"left"}} id="outlined-multiline-flexible" label="type" value="int" multiline maxRows={2}/>
                                 
                                </div>
                                </Grid>
                                
                            </Typography>
                            <TableHead>
            
            
        </TableHead>
                        </CardContent>
                        <CardActions>
                            
                        </CardActions>
                    </React.Fragment>
                </Card>
            </Box>
            <Handle
                type="source"
                position="right"
                id="a"
                style={{ background: '#555' }}
            />
        </>)
}

const destinationNode = ({ data }) => {
    return (
        <>
            <Handle
                type="target"
                position="left"
                id="b"
                style={{ background: '#555' }}
            />
            <Box sx={{ minWidth: 75 ,minheight: 40 ,border: 3,borderColor: color1 ,borderRadius: 2 }}>
                <Card variant="outlined" >
                <CardHeader  style={{backgroundColor: color1,border: 1,borderColor: "red",borderRadius: 2 }} />
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {data.label}
                            </Typography>
                            <Typography sx={{ fontSize: 20 }} color="red" gutterBottom>
                                {data.name}
                            </Typography>
                            <TableHead>
                            <Grid>
                                    <div style={{}}>
                                <TextField style={{padding:"2px" ,position:"left"}} id="outlined-helperText" label="Attribute" defaultValue="id"/>
                                <TextField style={{padding:"2px" ,position:"left"}} id="outlined-multiline-flexible" label="type" value="int" multiline maxRows={2}/>
                                 <span style={{position:"ceter"}}><KeyIcon color='secondary' fontSize='large'/></span>
                                </div>
                                <div style={{display:'flex',marginTop:"2px"}}>
                                <TextField style={{padding:"2px" ,position:"left"}} id="outlined-helperText" label="Attribute" defaultValue="id"/>
                                <TextField style={{padding:"2px" ,position:"left"}} id="outlined-multiline-flexible" label="type" value="int" multiline maxRows={2}/>
                                 
                                </div>
                                </Grid>
            
        </TableHead>
                        </CardContent>
                        <CardActions>
                            
                        </CardActions>
                    </React.Fragment>
                </Card>
            </Box>
            

        </>)
}



let tableId=0;
let nodeId=0;
let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = { source: sourceNode, destination: destinationNode }

function ReactFlowMainUI() {
    const { color, generateColor }= useGenerateRandomColor(); 
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [structuredData, setStructuredData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [formState, setFormState] = useState([])
    const [formValues, setFormValues] = useState({})
    const [isViewOnly, setIsViewOnly] = useState(false)
    const [selectedNodeId, setSelectedNodeId] = useState("")
    const [objDataStructure, SetObjDataStructure] = useState({})
    const [projectName, setProjectName] = useState("")

    const addINode = useCallback(() => {
        reactFlowWrapper.current += 50;
        generateColor()
        setNodes((nodes) => {
            console.log(nodes);
            const id = `${++nodeId}`;
            return [
                ...nodes,
                {
                    id,
                    type: "source",
                    data: { label: "Input Node".toString(), value: "" ,  color: `${color}`},
                    position: { x: 250, y: 25 },
                }
            ];
        });
    }, [nodes]);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const onConnect = useCallback((params) => {
        setEdges((eds) => addEdge(params, eds))
    }, []);

    useEffect(() => {
        if (edges.length !== 0) {
            setDataStructure(edges, nodes)
        }
    }, [edges]);


    const setDataStructure = (edges, nodes) => {
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

    const onDoubleClickOfNode =(node)=>{
        setSelectedNodeId(node.id)
        handleOpen()
    }

    const getFormValues = (currFormValues) =>{
        let i=0
        let currObjDataStructure=objDataStructure
        currObjDataStructure[selectedNodeId]={}
        for(let formObj of formState[selectedNodeId]){
            currObjDataStructure[selectedNodeId][formObj.id]=currFormValues[i]
            i++
        }
        // console.log(currObjDataStructure)
        SetObjDataStructure(currObjDataStructure)
        setDataStructure(edges,nodes)
    }

    const stateListInitiator = (info,id) => {
        let stateList = []
        let currObjDataStructure=objDataStructure
        currObjDataStructure[id]={}
        for (let obj of info) {
          const reObj = {
            value: obj.defaultValue
          }
          currObjDataStructure[id][obj.id]={}
          currObjDataStructure[id][obj.id].value=obj.defaultValue
          
          
          stateList.push(reObj)
        }
        SetObjDataStructure(currObjDataStructure)
        return stateList
    }



    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const nodeObjStr = event.dataTransfer.getData('application/reactflow');
            let nodeObj = JSON.parse(nodeObjStr)
            const type = nodeObj.type
            let nodeId = getId()
            generateColor()
            let inputStatePrev=formState
            inputStatePrev[nodeId]=nodeObj.formFeilds
            setFormState(inputStatePrev)
            let dynamicFormPrev = formValues
            dynamicFormPrev[nodeId]=stateListInitiator(nodeObj.formFeilds,nodeId)
            setFormValues(dynamicFormPrev)

            // check if the dropped element is valid
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
                data: { label: `${type} node`, name: nodeObj.nodeType,color: `${color}` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    const generateProject=()=>{
        let resultCode=generatePythonCode(structuredData,projectName)
        let zip = new JSZip();
        zip.file(projectName+".py",resultCode)
        downloadZip(projectName,zip)
    }

    const downloadZip = (name,zip) => {
        return zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, name + ".zip");
        });
    };





    return (
        <ReactFlowProvider>
            <Button variant="outlined" style={{position:"top"}} onClick={addINode}>Add Node</Button>
            <div className="dndflow">
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <LeftSidebar />
                    </Grid>
                    <Grid item xs={10}>


                        <div className="reactflow-wrapper" style={{ height: "90vh", width: "100%" }} ref={reactFlowWrapper}>
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
                                fitView
                            >
                                <Controls />
                            </ReactFlow>
                        </div>


                    </Grid>
                    <Grid item xs={1}>
                        <RightSidebar />
                    </Grid>
                </Grid>
                <Dialog PaperProps={{
                    style: {
                        minHeight: '50%',
                        minWidth: '30%',
                        margin:"60px"
                    }
                }} open={open} onClose={handleClose}>
                    <div align="right">
                        <CloseIcon onClick={handleClose} />
                    </div>
                    <DialogTitle><div style={{ fontSize: "2.25vw", textAlign: "center", marginTop: "6px", marginBottom: "8px" ,width:"100%"}} >
                        Configuration
                    </div></DialogTitle>
                    <DialogContent><div style={{position:"center" , fontSize: "2.25vw", textAlign: "center", margin: "3rem" ,marginTop:"1rem",width:"80%"}}>
                        <DynamicForm Form={formState[selectedNodeId]} inputStateList={formValues[selectedNodeId]} setInputStateList={getFormValues} isViewOnlyMode={isViewOnly} /></div>
                    </DialogContent>
                </Dialog>
                <div>
                    <TextField id="outlined-basic" label="Project Name" value={projectName} onChange={(e) => { setProjectName(e.target.value) }} variant="outlined" />
                </div>
                <div>
                    <Button variant="contained" onClick={generateProject}>Generate Project</Button>
                </div>

                

            </div>
        </ReactFlowProvider>
    );
}

export default ReactFlowMainUI