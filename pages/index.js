import { useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import Button from "../components/Button";
import InputText from "../components/InputText";
import Modal from "../components/Modal";
import NodeImage from "../components/NodeImage";
import NodeVideo from "../components/NodeVideo";

const initialEdges = [];
const nodeTypes = { image: NodeImage, video: NodeVideo };

export default function HomePage() {
  const initialNodes = [
    {
      id: "initial_node",
      data: { label: "Hallo Nama Saya Affan" },
      position: { x: 200, y: 200 },
      type: "input",
    },
  ];

  const [inputNode, setInputNode] = useState("");
  const [inputNodeImage, setInputNodeImage] = useState("");
  const [inputNodeVideo, setInputNodeVideo] = useState("");
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalCreateMediaImage, setShowModalCreateMediaImage] =
    useState(false);
  const [showModalCreateMediaVideo, setShowModalCreateMediaVideo] =
    useState(false);
  const [showModalResult, setShowModalResult] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState({
    modal: false,
    data: {},
    type: null,
  });
  const [titleModal, setTitleModal] = useState("Add Nodes");

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodeClick = useCallback((_, { data, type }) => {
    setTitleModal("Detail Node");
    setShowModalDetail({
      modal: true,
      data: data,
      type: type,
    });
  });

  function addProcessNode() {
    setNodes((node) => [
      ...node,
      {
        id: inputNode.toLowerCase().replace(/\s/g, "_"),
        data: { label: inputNode, image: "image" },
        position: { x: 300, y: 300 },
      },
    ]);

    setInputNode("");
    setShowModalCreate(false);
  }

  function addProcessNodeMediaImage() {
    setNodes((node) => [
      ...node,
      {
        id: inputNode.toLowerCase().replace(/\s/g, "_"),
        data: { label: inputNode, source: inputNodeImage },
        position: { x: 300, y: 300 },
        type: "image",
      },
    ]);

    setInputNode("");
    setInputNodeImage("");
    setShowModalCreateMediaImage(false);
  }

  function addProcessNodeMediaVideo() {
    setNodes((node) => [
      ...node,
      {
        id: inputNode.toLowerCase().replace(/\s/g, "_"),
        data: { label: inputNode, source: inputNodeVideo },
        position: { x: 300, y: 300 },
        type: "video",
      },
    ]);

    setInputNode("");
    setInputNodeVideo("");
    setShowModalCreateMediaVideo(false);
  }

  function createNode() {
    setTitleModal("Add Node");
    setShowModalCreate(true);
  }

  function createNodeMediaImage() {
    setTitleModal("Add Media Image Node");
    setShowModalCreateMediaImage(true);
  }

  function createNodeMediaVideo() {
    setTitleModal("Add Media Video Node");
    setShowModalCreateMediaVideo(true);
  }

  function showResult() {
    setTitleModal("Result Node");
    setShowModalResult(true);
  }

  return (
    <>
      <main className="w-full relative h-screen">
        <div className="absolute z-10 w-full h-full">
          <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDoubleClick={onNodeClick}
            nodeTypes={nodeTypes}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <div className="absolute w-full z-20">
          <div className="relative flex flex-col w-full py-4 h-full items-center justify-center">
            <div className="p-4 blur-md rounded-xl bg-gray-300 flex space-x-4 justify-center items-center">
              <Button click={createNode} text="Create Node" />
              <Button
                click={createNodeMediaImage}
                text="Create Node Media Image"
              />
              <Button
                click={createNodeMediaVideo}
                text="Create Node Media Video"
              />
              <Button text="PUBLISH" click={showResult} />
            </div>
            <div className="py-2 mt-2 text-xs px-4 text-blue-600 font-bold rounded-full bg-blue-200">
              Double Klik Untuk Melihat Detail
            </div>
          </div>
        </div>
        <div className="absolute z-20 bottom-0 right-0">
          <div className="p-8">
            <div className="bg-clip-text text-transparent text-4xl font-semibold bg-gradient-to-br from-blue-600 to-purple-800">
              Choirul Affan Adi Putra
            </div>
          </div>
        </div>
        {showModalCreate && (
          <Modal
            show
            title={titleModal}
            close={() => setShowModalCreate(false)}
            className="absolute z-30"
          >
            <div className="flex flex-col space-y-4">
              <InputText change={(e) => setInputNode(e.target.value)} />
              <Button text="ADD" click={addProcessNode} className="w-full" />
            </div>
          </Modal>
        )}
        {showModalCreateMediaImage && (
          <Modal
            title={titleModal}
            close={() => setShowModalCreateMediaImage(false)}
            show
            className="absolute z-40"
          >
            <div className="flex flex-col space-y-4">
              <div className="text-purple-600">Media Image Link :</div>
              <InputText
                placeholder="Nama Node"
                change={(e) => setInputNode(e.target.value)}
              />
              <InputText
                placeholder="Link Gambar"
                change={(e) => setInputNodeImage(e.target.value)}
              />
              <Button
                text="ADD"
                click={addProcessNodeMediaImage}
                className="w-full"
              />
            </div>
          </Modal>
        )}
        {showModalCreateMediaVideo && (
          <Modal
            title={titleModal}
            close={() => setShowModalCreateMediaVideo(false)}
            show
            className="absolute z-40"
          >
            <div className="flex flex-col space-y-4">
              <div className="text-purple-600">Media Video Link :</div>
              <InputText
                placeholder="Nama Node"
                change={(e) => setInputNode(e.target.value)}
              />
              <InputText
                placeholder="Link Video"
                change={(e) => setInputNodeVideo(e.target.value)}
              />
              <Button
                text="ADD"
                click={addProcessNodeMediaVideo}
                className="w-full"
              />
            </div>
          </Modal>
        )}
        {showModalResult && (
          <Modal
            title={titleModal}
            close={() => setShowModalResult(false)}
            show
            className="absolute z-40"
          >
            <div className="p-4 flex flex-col space-y-2">
              <div>Geser kesamping untuk result full JSON</div>
              <div className="w-full px-2 bg-gray-800 text-green-500 overflow-x-auto py-4">
                <pre>{JSON.stringify(nodes)}</pre>
              </div>
            </div>
          </Modal>
        )}
        {showModalDetail && showModalDetail.modal && (
          <Modal
            title={titleModal}
            close={() => setShowModalDetail((detail) => (detail.modal = false))}
            show
            className="absolute z-40"
          >
            <div className="w-full overflow-x-auto flex flex-col space-y-2">
              {showModalDetail && (
                <div className="flex flex-col space-y-4">
                  <div>name: {showModalDetail.data.label}</div>
                </div>
              )}
              {showModalDetail.type == "image" && (
                <div className="flex flex-col space-y-4">
                  <div>source : {showModalDetail.data.source}</div>
                </div>
              )}
              {showModalDetail.type == "video" && (
                <div className="flex flex-col space-y-4">
                  <div>source : {showModalDetail.data.source}</div>
                </div>
              )}
            </div>
          </Modal>
        )}
      </main>
    </>
  );
}
