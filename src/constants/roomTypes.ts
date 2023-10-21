export type RoomTypeMapping = {
  SINGLE_ROOM: string;
  SINGLE_ROOM_FOR_TWO: string;
  ONE_BEDROOM_APARTMENT: string;
  TWO_BEDROOM_APARTMENT: string;
  BIG_STUDIO_APARTMENT: string;
};

const roomTypes: RoomTypeMapping = {
  SINGLE_ROOM: 'Single Room',
  SINGLE_ROOM_FOR_TWO: 'Single room for two',
  ONE_BEDROOM_APARTMENT: 'One bedroom apartment',
  TWO_BEDROOM_APARTMENT: 'Two bedroom apartment',
  BIG_STUDIO_APARTMENT: 'Big studio apartment'
}

export default roomTypes
