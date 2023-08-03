"use client";

import Upload from "@/components/upload/Upload";
import React, { useEffect, useRef, useState } from "react";
import { CreateLecture } from "./CreateLecture";

interface Props {
  setLecture: React.Dispatch<React.SetStateAction<CreateLecture>>;
}

function secondsToTime(seconds: number): string {
  const pad = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
  } else {
    return `${pad(minutes)}:${pad(remainingSeconds)}`;
  }
}

export default function CreateVideoLecture({ setLecture }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [duration, setDuration] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (files.length !== 0 && videoRef.current) {
      videoRef.current.src = URL.createObjectURL(files[0]);
      videoRef.current.onloadedmetadata = () => {
        setDuration(secondsToTime(videoRef.current!.duration));
      };
    }
    setLecture(prev => {
      return {
        ...prev,
        lectureContent: {
          ...prev.lectureContent,
          video: files,
          videoLength: duration,
        },
      };
    });
  }, [setLecture, files, duration]);

  return (
    <div>
      <Upload role="lecture" files={files} setFiles={setFiles} />
      <video src="" className="hidden" ref={videoRef} />
    </div>
  );
}
