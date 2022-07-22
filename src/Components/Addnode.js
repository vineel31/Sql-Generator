import React, { useState, useRef,useEffect, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    removeElements,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    MiniMap,
} from 'react-flow-renderer';
import generatePythonCode from './generatePythonCode';
import JSZip from 'jszip';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Handle } from 'react-flow-renderer';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import UseGenerateRandomColor from './useGenerateRandomColor';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import CustomEdge from './customedge';
import KeyIcon from '@mui/icons-material/Key';
import AddIcon from '@mui/icons-material/Add';
import TableHead from '@mui/material/TableHead';
import Generatesql from './Generatesql';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import { saveAs } from 'file-saver';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];





const initialNodes = [
    {
        id: '1',
        type: 'middle',
        data: { label: 'Input Node', value: "" },
        position: { x: 250, y: 25 },
    },
];
const columns = [
    {
        field: 'Name',
        headerName: 'Name',
        width: 100
    },
    {
        field: 'dataType',
        headerName: 'Type',
        width: 100
    },

]

const sourceNode = ({ data }) => {
  if(data.color===""){
    data.color="b5c28c"
}
    return (
        <>

<Box sx={{ minWidth: 400 ,minheight: 400 ,border: 3,borderColor: "#"+data.color ,borderRadius: 2 }}>
                <Card variant="outlined" sx={{ maxWidth: 500, minHeight: 300, minWidth: 260 }}>
                <CardHeader  style={{backgroundColor: "#"+data.color,border: 1,borderColor: "red",borderRadius: 2,borderTopRightRadius:"80px 80px",borderBottomRightRadius:"80px 80px" }} title={data.label}/>
                
                  
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                <div style={{color:"#"+data.color,fontSize:"30"}}>
                                  
                                
                                
                                {/* <span style={{position:'absolute',right:'20px'}}><AddIcon color='secondary' fontSize='large'/></span> */}
                                </div> 
                            </Typography>
                            <Typography sx={{ fontSize: 30 }} style={{color:"#"+data.color}} gutterBottom>
                                {data.name}
                                {/* <Grid>
                                    <div style={{}}>
                                <TextField style={{padding:"2px" ,position:"left"}} id="outlined-helperText" label="Attribute" defaultValue="id"/>
                                <TextField style={{padding:"2px" ,position:"left"}} id="outlined-multiline-flexible" label="type" value="int" multiline maxRows={2}/>
                                 <span style={{position:"ceter"}}><KeyIcon color='secondary' fontSize='large'/></span>
                                </div>
                                <div style={{display:'flex',marginTop:"2px"}}>
                                <TextField style={{padding:"2px" ,position:"left"}} id="outlined-helperText" label="Attribute" defaultValue="id"/>
                                <TextField style={{padding:"2px" ,position:"left"}} id="outlined-multiline-flexible" label="type" value="int" multiline maxRows={2}/>
                                 
                                </div>
                                </Grid> */}
                                
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
                style={{ backgroundColor: 'primary.main' }}
                isConnectable={true}
            /> 
        </>
    )
}
const colNode = ({ data }) => {

    return (
        <>
            <Handle
                type="target"
                position="left"
                onConnect={(params) => console.log('handle onConnect', params)}
                style={{ backgroundColor: 'primary.main' }}
                isConnectable={true}
            />
            <Card variant="outlined" sx={{ minWidth: 300, maxHeight: 50 }}>

                <React.Fragment>
                    <CardContent  >

                        {data.label} | {data.value} | {data.key} | {data.n}

                    </CardContent>

                </React.Fragment>
            </Card>
            <Handle
                type="source"
                position="right"
                id="a"
                style={{ backgroundColor: 'primary.main' }}
                isConnectable={true}
            />

        </>
    );
}
const mNode = ({ data }) => {
    const { color, generateColor } = UseGenerateRandomColor();

    return (
        <>
            <Handle
                type="target"
                position="left"
                onConnect={(params) => console.log('handle onConnect', params)}
                style={{ backgroundColor: 'primary.main' }}
                isConnectable={true}
            />
            <Box sx={{ minWidth: 75 ,minheight: 40 ,border: 3,borderColor: "#"+data.color ,borderRadius: 2 }}>
                <Card variant="outlined" >
                <CardHeader  style={{backgroundColor: "#"+data.color,border: 1,borderColor: "red",borderRadius: 2,borderTopRightRadius:"80px 80px",borderBottomRightRadius:"80px 80px" }} />
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                <div style={{color:"#"+data.color,fontSize:"30"}}>
                                {data.label}
                                <span style={{position:'absolute',right:'20px'}}><AddIcon color='secondary' fontSize='large'/></span>
                                </div> 
                            </Typography>
                            <Typography sx={{ fontSize: 30 }} style={{color:"#"+data.color}} gutterBottom>
                                {data.name}
                                <Grid>
                                    <div style={{}}>
                                <TextField style={{padding:"2px" ,position:"left"}} id="outlined-helperText" label="Attribute" defaultValue='${data.label}'/>
                                <TextField style={{padding:"2px" ,position:"left"}} id="outlined-multiline-flexible" label="type" value="int" multiline maxRows={2}/>
                                 <span style={{position:"ceter"}}><KeyIcon color='secondary' fontSize='large'/></span>
                                </div>
                                <div style={{display:'flex',marginTop:"2px"}}>
                                <TextField style={{padding:"2px" ,position:"left"}} id="outlined-helperText" label="Attribute" defaultValue='${data.label}'/>
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
                style={{ backgroundColor: 'primary.main' }}
                isConnectable={true}
            />

        </>
    );
}

const destNode = ({ data }) => {
    const { color, generateColor } = UseGenerateRandomColor();

    return (
        <>
            <Handle
                type="target"
                position="left"
                onConnect={(params) => console.log('handle onConnect', params)}
                style={{ backgroundColor: 'primary.main' }}
                isConnectable={true}
            />
            <Box sx={{ minWidth: 75 ,minheight: 40 ,border: 3,borderColor: "#"+data.color ,borderRadius: 2 }}>
                <Card variant="outlined" >
                <CardHeader  style={{backgroundColor: "#"+data.color,border: 1,borderColor: "red",borderRadius: 2,borderTopRightRadius:"80px 80px",borderBottomRightRadius:"80px 80px" }} />
                    <React.Fragment>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                <div style={{color:"#"+data.color,fontSize:"30"}}>
                                {data.label}
                                <span style={{position:'absolute',right:'20px'}}><AddIcon color='secondary' fontSize='large'/></span>
                                </div> 
                            </Typography>
                            <Typography sx={{ fontSize: 30 }} style={{color:"#"+data.color}} gutterBottom>
                                {data.name}
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

        </>
    )
}

let id = 0;
const getId = () => `dndnode_${id++}`;
const nodeTypes = { source: sourceNode, middle: mNode, dest: destNode, col: colNode };
const edgeTypes = {
    custom: CustomEdge,
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
let nodeId = 0;
let tableId=0;
const Datablock = () => {
  const [projectName, setProjectName] = useState("")
  const [structuredData, setStructuredData] = useState([]);
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [objectEdit, setObjectEdit] = useState({});
  

    const { color, generateColor } = UseGenerateRandomColor();
    const [colId, setColId] = useState([]);
    const [objDataStructure, SetObjDataStructure] = useState({})
    const [pos,setPos] = useState({});
    const onDoubleClickOfNode = (node) => {
        { console.log("node", node) }
        setObjectEdit(node)

    }

    const onPaneClick = () => {
        setObjectEdit({});
    };
    const onConnect = (params) => setEdges((eds) => addEdge({ ...params, type: 'custom' }, eds));
    useEffect(() => {
      if (edges.length !== 0) {
          setDatastructure(edges, nodes)
      }
  }, [edges]);
  const setDatastructure = (edges, nodes) => {
    console.log("Edges: ", edges)
    console.log("Nodes: ", nodes)
    let objList = {}
    for (let node of nodes) {
        let struct = {
            id: node.id,
            name: node.data.name,
            type: node.data.label,
            sources: [],
            targets: []
        }
        objList[node.id] = struct
    }
    console.log("Object List: ", objList)
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
    console.log("The Structure is:", arr)
    setStructuredData(struct)
}

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const addINode = useCallback(() => {
        reactFlowWrapper.current += 50;
        generateColor()
        const position = {
            x: 250 ,
            y: 10 ,
        };
        setPos(position)
        setNodes((nodes) => {
            const id = `${++nodeId}`;
            const tid = `${++tableId}`;
            return [
                ...nodes,
                {
                    id,
                    type: "source",
                    data: { label: "Source ", value: "", color: `${color}` },
                    position,
                }
            ];
        });
    }, [nodes]);
    const addMNode = useCallback(() => {
        reactFlowWrapper.current += 50;
        generateColor()
        setNodes((nodes) => {
            return [
                ...nodes,
                {
                    id: Math.random().toString(),
                    type: "middle",
                    data: { label: "TopBar", value: "", color: `${color}` },
                    position: { x: 250, y: 25 },
                }
            ];
        });
    }, []);
    const addONode = useCallback(() => {
        reactFlowWrapper.current += 50;
        generateColor()
        setNodes((nodes) => {
            return [
                ...nodes,
                {
                    id: Math.random().toString(),
                    type: "dest",
                    data: { label: "Destination Node", value: "", color: `${color}` },
                    position: { x: 250, y: 25 },
                }
            ];
        });
    }, [nodes]);
    
    const addColid = () => {
        setColId(objectEdit.id)
        addCol(colId)
    }
    useEffect(() => {
      if (colId !== []) {

          console.log("object 3: ",colId)
          
      }
  }, [colId]);

  const addCol = useCallback( async (event) => {
    reactFlowWrapper.current += 50;
    const position = {
        x: 10 ,
        y: 10,
    };

        setNodes((nodes) => {
            
            const id = `${++nodeId}`;
            const parentNode = `${colId}`
            return [
                ...nodes,
                {
                    id,
                    type: "col",
                    data: { label: "ROW", value: "" ,key:"",n:"",pNode:`${colId}`},
                    position,
                    parentNode,
                    extent: 'parent',
                }
            ];
        });
    }, [nodes]);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
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
  const generateProject = () => {
    let resultCode = Generatesql(nodes,edges)
    let zip = new JSZip();
    zip.file(projectName + ".sql", resultCode)
    downloadZip(projectName, zip)
}

const downloadZip = (name, zip) => {
  return zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, name + ".zip");
  });
};

    return (
      <><Box sx={{ flexGrow: 1 }}>
          <div className="dndflow">
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <Button variant="contained" size='large' onClick={addINode}> Add Table +</Button>
                 {/* <Button variant="outlined" onClick={addMNode}>Topbar</Button>
                <Button variant="outlined" onClick={addONode}>Sink</Button>  */}
                <div style={{padding:"1rem",marginleft:"10px"}}>
                <TextField id="contained" label="Project Name" value={projectName} onChange={(e) => { setProjectName(e.target.value) }} variant="outlined" />
                <Button style={{padding:"1rem",marginleft:"20px"}} variant="contained" onClick={generateProject}>Generate Project</Button>
                </div>
                
                <div style={{ textAlign: "left", padding: 10 }}>

                  {console.log("object:", objectEdit.id)}
                  {objectEdit.type === 'source' && (
                    <>

                      {"Table Name :  "}
                      <input
                        value={objectEdit.data.value}
                        onChange={(e) => {
                          setObjectEdit({
                            ...objectEdit,
                            data: { ...objectEdit.data, value: e.target.value }
                          });

                          const newElement = nodes.map((item) => {
                            if (item.id === objectEdit.id) {
                              return {
                                ...item,
                                data: { ...item.data, label: e.target.value }
                              };
                            }
                            return item;
                          });

                          setNodes(newElement);
                        } } />
                      {" "}
                      <Button variant="contained" onClick={addColid}>Add a New Row</Button>
                    </>
                  )}
                  {objectEdit.type === 'col' && (
                    <>



                      {"Name: "}<input
                        value={objectEdit.data.label}
                        onChange={(e) => {
                          setObjectEdit({
                            ...objectEdit,
                            data: { ...objectEdit.data, label: e.target.value }
                          });

                          const newElement = nodes.map((item) => {
                            if (item.id === objectEdit.id) {
                              return {
                                ...item,
                                data: { ...item.data, label: e.target.value }
                              };
                            }
                            return item;
                          });

                          setNodes(newElement);
                        } } />
                      <br></br><br></br>{"Data type: "}
                      <Select

                        value={objectEdit.data.value}
                        label="datatype"
                        onChange={(e) => {
                          setObjectEdit({
                            ...objectEdit,
                            data: { ...objectEdit.data, value: e.target.value }
                          });

                          const newElement = nodes.map((item) => {
                            if (item.id === objectEdit.id) {
                              return {
                                ...item,
                                data: { ...item.data, value: e.target.value }
                              };
                            }
                            return item;
                          });

                          setNodes(newElement);
                        } }
                      >
                        <MenuItem value={'int'}>Int</MenuItem>
                        <MenuItem value={'float'}>Float</MenuItem>
                        <MenuItem value={'char'}>Char</MenuItem>
                        <MenuItem value={'varchar'}>Varchar</MenuItem>
                      </Select>
                      {"Key: "}
                      <Select

                        value={objectEdit.data.key}
                        label="Key"
                        onChange={(e) => {
                          setObjectEdit({
                            ...objectEdit,
                            data: { ...objectEdit.data, key: e.target.value }
                          });

                          const newElement = nodes.map((item) => {
                            if (item.id === objectEdit.id) {
                              return {
                                ...item,
                                data: { ...item.data, key: e.target.value }
                              };
                            }
                            return item;
                          });

                          setNodes(newElement);
                        } }
                      >
                        <MenuItem value={'primary'}>Primary</MenuItem>
                        <MenuItem value={'unique'}>Unique</MenuItem>
                        <MenuItem value={'Foreign'}>Foreign</MenuItem>
                        <MenuItem value={'none'}>None</MenuItem>
                      </Select>
                      {" Null: "}
                                            <Select
                                                
                                                value={objectEdit.data.n}
                                                onChange={(e) => {
                                                    setObjectEdit({
                                                        ...objectEdit,
                                                        data: { ...objectEdit.data, n: e.target.value }
                                                    });

                                                    const newElement = nodes.map((item) => {
                                                        if (item.id === objectEdit.id) {
                                                            return {
                                                                ...item,
                                                                data: { ...item.data, n: e.target.value }
                                                            };
                                                        }
                                                        return item;
                                                    });

                                                    setNodes(newElement);
                                                }}
                                            >
                                                <MenuItem value={'null'}>Nullable</MenuItem>
                                                <MenuItem value={'not null'}>Not Null</MenuItem>
                                                
                                            </Select>

                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={8}>
                <Item>
                  <ReactFlowProvider>
                    <div className="reactflow-wrapper" style={{ width: "100%", height: "80vh" }} ref={reactFlowWrapper}>
                      <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}

                        onNodeDoubleClick={(event, node) => onDoubleClickOfNode(node)}

                        onPaneClick={onPaneClick}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        fitView
                      >
                        <Controls />
                        <Background />
                        <MiniMap />
                      </ReactFlow>
                    </div>

                  </ReactFlowProvider>

                </Item>
              </Grid>

            </Grid>
          </div>
        </Box></>

    );
};

export default Datablock;