import React from 'react';
import { Room } from '../mock-data';
import { Home, Ruler, DollarSign, Plus, Edit2, Trash2 } from 'lucide-react';

interface RoomListProps {
  rooms: Room[];
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  return (
    <div className="bg-card text-card-foreground rounded-2xl shadow-md p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Rooms ({rooms.length})</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          Add Room
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div key={room.id} className="rounded-xl p-5 hover:shadow-lg transition-all duration-300 bg-accent/30 hover:bg-accent/50 group relative">
            {/* Action Buttons (Show on Hover) */}
            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button className="p-1.5 hover:bg-background rounded-full text-muted-foreground hover:text-primary transition-colors" title="Edit Room">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 hover:bg-red-100 rounded-full text-muted-foreground hover:text-red-500 transition-colors" title="Delete Room">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Status Badge (Hide on Hover) */}
            <div className="absolute top-4 right-4 transition-opacity group-hover:opacity-0 duration-200">
              <span 
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  room.status?.color === 'bg-green-500' 
                    ? 'bg-green-100 text-green-700' 
                    : room.status?.color === 'bg-blue-500'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {room.status?.name || 'Unknown'}
              </span>
            </div>

            <div className="flex justify-between items-start mb-2 mt-1">
              <div className="flex items-center">
                <Home className="w-5 h-5 text-secondary mr-2" />
                <h3 className="font-semibold">{room.name}</h3>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{room.description}</p>
            
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center text-muted-foreground">
                <Ruler className="w-4 h-4 mr-1" />
                <span>{room.size_sq_m} m²</span>
              </div>
              <div className="flex items-center font-medium text-primary">
                <DollarSign className="w-4 h-4 mr-1" />
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.base_rent)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
