import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dummyChats } from '../assets/assets';
import { Loader2Icon, Send, X } from 'lucide-react';
import { clearChat } from '../app/features/chatSlice';
import { format, formatDate } from 'date-fns';

const ChatBox = () => {
    const {listing, isOpen, chatId} = useSelector((state)=>state.chat)
    const dispatch = useDispatch()

    const user = {id: 'user_2'};

    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);

    const fetchChat = async () => {

        setChat(dummyChats[0]);
        setMessages(dummyChats[0].messages)
        setIsLoading(false)        

    }

    useEffect(()=>{
        if(listing){
            fetchChat()
        }
    },[listing])

    useEffect(()=>{
        if(!isOpen){
            setChat(null)
            setMessages([])
            setIsLoading(true)
            setNewMessage("")
            setIsSending(false)
        }
    },[isOpen])

    // For Auto Scroll
    const messagesEndRef = useRef(null)
    useRef(()=>{
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    },[messages.length])

    const handleSendMessage = async (e) =>{
        e.preventDefault();
        if(!newMessage.trim() || isSending) return;
        setMessages([...messages, {id: Date.now(), chatId: chat.id, sender_id: user.id, message: newMessage, createdAt: new Date()}]);
        setNewMessage("")

    }

    if(!isOpen || !listing) return null


  return (
    <div className='fixed inset-0 bg-black/70 background-blur gb-opacity-50 z-100 flex itmes-center justify-center sm:p-4'>
      <div className='bg-white sm:rounded-none shadow-2xl w-full max-w-2xl h-screen sm:h-[600px] flex flex-col'>
        {/* Header */}
        <div className='bg-gradient-to-r bg-gradient-to-r from-gray-800 to-[#748298] text-white p-4 sm:rounded-t-none flex items-center justify jsutify-between'>
            <div className='flex-1 min-w-0'>
                <h3 className='font-semibold text text-lg truncatte'>{listing?.title}</h3>
                <p className='text-sm: text-indigo-100 truncate'>{user.id === listing?.ownerId ? `Chatting with buyer (${chat?.chatUser?.name || 'Loading...'})` :    `Chatting with seller (${chat?.ownerUser?.name || 'Loading...'})`}</p>
            </div>
            <button onClick={()=> dispatch(clearChat())} className='ml-4 p-1 hover:bg-white/20 hover:bg-opacity-20 rounded-none transition-colors'>
                <X className='w-5 h-5'/>
            </button>
        </div>

        {/* Messages Area */}
        {/* 5:06:20 */}
        <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100'>
            {isLoading ? (
                <div>
                    <Loader2Icon className='size-6 animate-spin text-gray-600'/>
                </div>
            ): messages.length === 0 ? (
                <div className='flex items-center justify-center h-full'>
                    <div className='text-center'>
                        <p>No messages yet</p>
                        <p>Start a conversation!</p>
                    </div>
                </div>
            ) : (
                messages.map((message)=>(
                    <div key={message.id} className={`flex ${message.sender_id === user.id ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] rounded-lg p-3 pb-1 ${message.sender_id === user.id ? "bg-gray-600 text-white" : "bg-white border border-gray-200 text-gray-800"}`}>
                            <p className='text-sm break-words whitespace-pre-wrap'>{message.message}</p>
                            <p className={`text-[10px] mt-1 ${message.sender_id === user.id ? "text-indigo-200" : "text-gray-400"}`}>{formatDate(new Date(message.createdAt), "MMM dd 'at' h:mm a")}</p>
                        </div>
                    </div>
                ))
            )}
            <div ref={messagesEndRef}/>
        </div>

        {/* Input Area */}
        {chat?.listing?.status === "active" ? 
        (

            <form onSubmit={handleSendMessage} className='p-4 bg-white border-t border-gray-200 rounded-b-lg'>
                <div className='flex items-end space-x-2'>

                    <textarea 
                    value={newMessage}
                    onChange={(e) =>setNewMessage(e.target.value)}
                    onKeyDown={(e)=>{
                        if(e.key === "Enter" && !e.shiftKey){
                            e.preventDefault();
                            handleSendMessage(e)
                        }
                    }} 
                    placeholder='Type your message...' className='flex-1 resize-none border border-gray-300 rounded-lg px-4 py-2 focus:outline-gray-500 max-h-32' rows={1}/>
                    
                    <button disabled={!newMessage.trim() || isSending} type='submit' className='bg-gray-600 hover:bg-gray-700 text-white p-2.5 rounded-none disabled:opacity-50 transition-colors'>
                        {isSending ?
                        <Loader2Icon className='w-5 h-5 animate-spin'/>
                        : <Send className='w-5 h-5'/>}
                    </button>
                </div>
            </form>
        )
        :
        (
            <div className='p-4 bg-white border-t border-gray-200 rounded-b-lg'>
                <p className='text-sm text-gray-600 text-center'>{chat ? `Listing is ${chat?.listing?.status}` : "Loading chat..."}</p>
            </div>

        )}

      </div>
    </div>
  )
}

export default ChatBox
