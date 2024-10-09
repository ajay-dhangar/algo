import React, { useState } from "react";
import Layout from "@theme/Layout";
import { FaFolderOpen, FaFileAlt } from "react-icons/fa";
import { topics } from "../../data/topics";

const DSARoadmap: React.FC = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleFolder = (folderName: string) => {
    setExpanded((prev) => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  return (
    <Layout
      title="DSA Roadmap"
      description="Data Structures and Algorithms Learning Path"
    >
      <div className="min-h-screen">
        <div className="container mx-auto py-8 px-6">
          <h1 className="text-4xl font-bold text-center mb-8">
            Data Structures & Algorithms Roadmap
          </h1>

          {topics.map((topic, idx) => (
            <div key={idx} className="mb-12">
              <h2 className="text-3xl font-semibold mb-6">{topic.title}</h2>

              {topic.folders.map((folder, idx) => (
                <div key={idx} className="mb-6">
                  <div
                    className="flex items-center cursor-pointer p-4 bg-[var(--ifm-color-primary)] text-white rounded-lg"
                    onClick={() => toggleFolder(folder.name)}
                  >
                    <FaFolderOpen className="mr-3" />
                    <span className="text-xl font-bold">{folder.name}</span>
                  </div>

                  {expanded[folder.name] && (
                    <div className="mt-2 ml-6">
                      {folder.files.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center p-3 border-b border-gray-300 dark:border-gray-700"
                        >
                          <FaFileAlt className="mr-3 text-gray-500 dark:text-gray-400" />
                          <span>{file}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DSARoadmap;
