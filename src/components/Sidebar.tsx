"use client";

import { Lecture } from "@/types/firebase.types";
import React, { useState } from "react";
import { DnDWrapper } from "./DnDWrapper";

export interface Content {
  id: Lecture["id"];
  title: Lecture["title"];
  order: number; // Lecture["order"]
  checked?: boolean;
}

interface Props {
  courseId?: string;
  header: string;
  contents: Content[];
  isEdit?: boolean;
  isCourseChecked?: boolean;
  lectureCheckHandler?: (id: string) => void;
  courseCheckHandler?: (courseId: string) => void;
  onDragEnd: (newOrder: any[]) => void;
}

const Sidebar = ({
  header,
  contents,
  courseId,
  isEdit,
  isCourseChecked,
  lectureCheckHandler,
  courseCheckHandler,
  onDragEnd,
}: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [changeTitle, setChangeTitle] = useState(header); // 최종적으로 수정 된 값을 부모 컴포넌트로 올려야한다.

  const onChangeTitle = (e: any) => {
    setChangeTitle(e.target.value);
  };

  return (
    <div className="w-[245px]">
      <div
        className="flex items-center py-[13px] rounded-[10px] text-grayscale-80 bg-primary-5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-[55px] flex justify-center items-center">
          {isEdit ? (
            <>
              <input
                type="checkbox"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                onChange={() => {
                  if (courseCheckHandler !== undefined)
                    courseCheckHandler(courseId as string);
                }}
                value={courseId}
                checked={isCourseChecked}
              />
            </>
          ) : (
            <span className="text-sm">🎯</span>
          )}
        </div>
        {isEditTitle ? (
          <input
            type="text"
            placeholder={header}
            value={changeTitle}
            onChange={onChangeTitle}
          />
        ) : (
          changeTitle
        )}

        {courseId && isEdit && (
          <input
            type="button"
            value="수정"
            onClick={e => {
              e.stopPropagation();
              setIsEditTitle(!isEditTitle);
            }}
          />
        )}
      </div>
      {isOpen && (
        <ul className="my-[10px]">
          {!isEdit ? (
            <>
              {contents.map(content => (
                <li
                  key={content.id}
                  className="flex items-center text-sm text-grayscale-80 py-[10px] cursor-pointer"
                >
                  <div className="w-[55px] flex justify-center items-center">
                    {isEdit && (
                      <input
                        type="checkbox"
                        value={content.id}
                        onChange={() => {
                          if (lectureCheckHandler !== undefined)
                            lectureCheckHandler(content.id);
                        }}
                        checked={content.checked}
                      />
                    )}
                  </div>
                  {content.title}
                </li>
              ))}
            </>
          ) : (
            <DnDWrapper
              dragSectionName={courseId ? courseId : "dragSectionName"}
              dragList={contents}
              onDragEnd={onDragEnd}
            >
              {(dragItem, ref, isDragging) => (
                <li
                  ref={ref}
                  key={dragItem.id}
                  className={`flex items-center text-sm text-grayscale-80 py-[10px] cursor-pointer ${
                    isDragging && "opacity-20"
                  }`}
                >
                  <div className="w-[55px] flex justify-center items-center">
                    {isEdit && (
                      <input
                        type="checkbox"
                        value={dragItem.id}
                        onChange={() => {
                          if (lectureCheckHandler !== undefined)
                            lectureCheckHandler(dragItem.id);
                        }}
                        checked={dragItem.checked}
                      />
                    )}
                  </div>
                  {dragItem.title}
                </li>
              )}
            </DnDWrapper>
          )}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
