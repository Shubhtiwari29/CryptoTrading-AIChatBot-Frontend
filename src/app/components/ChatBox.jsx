"use client";
import React, { useState } from 'react';
import PromptMessage from './PromptMessage';
import ResponseMessage from './ResponseMessage';
import axios from 'axios';

const ChatBox = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchCoinDetails = async (prompt) => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:8080/ai/chat", { prompt });
      const response = { message: data.message, role: "model" };
      setResponse(prev => [...prev, response]);
      console.log("Success..", data);
    } catch (error) {
      console.log("Error..", error);
    }
    setLoading(false);
  };

  return (
    <div className='chatbox blur-background large-shadow z-50 bg-black w-[90vw] md:w-[70vw] lg:w-[40vw] pb-6 h-[85vh] shadow-2xl shadow-purple-500'>
      <div className='h-[13%] pl-3 border-b border-gray-700 flex gap-x-4 items-center'>
        <img className='rounded-full w-12 h-12' 
          src="https://cdn.pixabay.com/photo/2023/05/29/18/53/cyborg-8026949_640.jpg" alt="AI Chat Bot"/>
        <div>
          <h1 className='text-lg font-semibold text-white'>AI Chat Bot</h1>
          <p className='text-sm text-gray-400'>Real Time Crypto Market Data</p>
        </div>
      </div>

      <div className='h-[77%]'>
        {response.length ?<div className="flex flex-col py-5 px-5 overflow-y-auto h-full custom-scrollbar">
          {response.map((item, index) =>
            item.role === "user" ? (
              <div className='self-end' key={index}>
                <PromptMessage message={item.message} />
              </div>
            ) : (
              <div className='self-start' key={index}>
                <ResponseMessage message={item.message} />
              </div>
            )
          )}
          {loading && (
            <div className='flex items-center justify-start p-3'>
              <p className='text-white'>Fetching Data From The Server...</p>
            </div>
          )}
        </div> : <div className='p-10 gap-5 h-full flex flex-col justify-center items-center'>
          <p className="font-bold text-2xl text-white">Welcome to the Crypto Chat Bot</p>
          <p className="text-gray-400">Inquire about market data.</p>
        </div>}
        
      </div>

      <div className="h-[10%] px-5">
        <input 
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              const data = { message: e.target.value, role: "user" };
              setResponse(prev => [...prev, data]);
              handleFetchCoinDetails(e.target.value);
              e.target.value = ''; 
            }
          }}
          type="text" 
          className='h-full rounded-full border-gray-700 border bg-black text-white px-5 w-full outline-none'
          placeholder='Give Your Prompt...'
        />
      </div>
    </div>
  );
};

export default ChatBox;