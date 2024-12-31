import Navbar from "./components/Navbar";
import VideoPlayer from "./components/VideoPlayer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <main className="pt-16">
        <VideoPlayer />
      </main>
    </div>
  );
}
