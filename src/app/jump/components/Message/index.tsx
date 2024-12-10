interface MessageProps {
  author: string;
  time: string;
  likes: number;
  content: string;
  type: string;
  isCurrentUser?: boolean;
}

const Message = ({ author, time, likes, content, type, isCurrentUser }: MessageProps) => {
  const bgColor: {[key: string]: string} = {
    token: "bg-yellow-500",
    user: "bg-indigo-900",
    reply: "bg-blue-500",
  };

  const alignment = isCurrentUser ? "justify-end ml-24" : "justify-start mr-24";
  
  return (
    <div className={`flex items-start mb-4 ${alignment}`}>
      {!isCurrentUser && (
        <img src={`https://picsum.photos/seed/${Math.random().toString()}/32/32`} alt="avatar" className="w-12 h-12 rounded-full mr-4" />
      )}
      <div className={`p-4 ${bgColor[type]} rounded-lg text-white flex-1 relative`}>
        <div className="text-sm">
          <span className={`font-bold p-1 rounded ${type === 'token' ? 'bg-pink-500' : 'bg-green-500'}`}>
            {author}
          </span>
          <span className="ml-2 text-gray-300">{time}</span>
          <span className="ml-2">♥ {likes}</span>
        </div>
        <p className="mt-1">{content}</p>
        {!isCurrentUser && (
          <button className="text-gray-300 ml-2 text-sm absolute right-4 top-4">reply</button>
        )}
      </div>
      {isCurrentUser && (
        <img src={`https://picsum.photos/seed/${Math.random().toString()}/32/32`} alt="avatar" className="w-12 h-12 rounded-full ml-4" />
      )}
    </div>
  );
};

export default Message;