import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const TestPage = () => {
  const sigCanvas = useRef<SignatureCanvas>(null);

  const clearSignature = () => sigCanvas.current?.clear();
  const saveSignature = () => {
    const dataUrl = sigCanvas.current?.toDataURL();
    console.log("Signature Image URL:", dataUrl);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Sign to Accept Product</h2>
      <div className="border rounded bg-gray-100 p-4">
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            className: "w-full h-64 border rounded bg-white",
          }}
        />
      </div>
      <div className="flex mt-4 gap-4">
        <button
          onClick={clearSignature}
          className="p-2 bg-red-500 text-white rounded"
        >
          Clear
        </button>
        <button
          onClick={saveSignature}
          className="p-2 bg-green-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TestPage;
