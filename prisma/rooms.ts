import { RoomType } from '@prisma/client';

import * as dal from '../src/lib/modules/room/room.dal';

enum Preview {
  BigStudioApartment = 'https://resumegpt-general.s3.eu-central-1.amazonaws.com/BigStudioApartment.png',
  OneBedroomApartment = 'https://resumegpt-general.s3.eu-central-1.amazonaws.com/OneBedroomApartment.png',
  SingleRoom = 'https://resumegpt-general.s3.eu-central-1.amazonaws.com/SingleRoom.png',
  SingleRoomForTwo = 'https://resumegpt-general.s3.eu-central-1.amazonaws.com/SingleRoomForTwo.png',
  TwoBedroomApartment = 'https://resumegpt-general.s3.eu-central-1.amazonaws.com/TwoBedroomApartment.png',
}

interface ICreateRoom {
  name: string;
  type: RoomType;
  capacity: number;
  isAvailable: boolean;
  preview: string;
}

function generateRoomData() {
  const rooms: ICreateRoom[] = [];
  const roomTypes = [
    RoomType.SINGLE_ROOM,
    RoomType.SINGLE_ROOM_FOR_TWO,
    RoomType.ONE_BEDROOM_APARTMENT,
    RoomType.TWO_BEDROOM_APARTMENT,
    RoomType.BIG_STUDIO_APARTMENT,
  ];

  for (
    let building = 'A'.charCodeAt(0);
    building <= 'C'.charCodeAt(0);
    building++
  ) {
    for (let floor = 1; floor <= 9; floor++) {
      for (let roomNumber = 1; roomNumber <= 10; roomNumber++) {
        const roomType = roomTypes[roomNumber % 5];
        const name =
          String.fromCharCode(building) +
          floor.toString().padStart(1, '0') +
          roomNumber.toString().padStart(2, '0');
        const preview = getPreviewForRoomType(roomType);

        const roomData: ICreateRoom = {
          name,
          type: roomType,
          capacity: roomType === RoomType.SINGLE_ROOM ? 1 : 2,
          isAvailable: true,
          preview,
        };

        rooms.push(roomData);
      }
    }
  }

  return rooms;
}

function getPreviewForRoomType(roomType: RoomType): string {
  switch (roomType) {
    case RoomType.SINGLE_ROOM:
      return Preview.SingleRoom;
    case RoomType.SINGLE_ROOM_FOR_TWO:
      return Preview.SingleRoomForTwo;
    case RoomType.ONE_BEDROOM_APARTMENT:
      return Preview.OneBedroomApartment;
    case RoomType.TWO_BEDROOM_APARTMENT:
      return Preview.TwoBedroomApartment;
    case RoomType.BIG_STUDIO_APARTMENT:
      return Preview.BigStudioApartment;
    default:
      return '';
  }
}

// Call the function to generate the array of room objects
const roomsArray = generateRoomData();

async function createRooms(rooms: ICreateRoom[]) {
  await dal.createRooms(rooms);
}

createRooms(roomsArray);
