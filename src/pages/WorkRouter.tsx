import { useParams } from "react-router-dom";
import ByClick from "./ByClick";

function WorkRouter() {
  const { slug } = useParams();

  switch (slug) {
    case "byclick-downloader":
      return <ByClick />;

    case "airbills-pay":
      return <Airbills />;

    case "solana-dex":
      return <SolanaDex />;

    default:
      return (
        <div className="text-black p-10 text-center">Project not found</div>
      );
  }
}

export default WorkRouter;
