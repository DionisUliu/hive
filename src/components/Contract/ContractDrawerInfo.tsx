import { Descriptions, DescriptionsProps, Tag } from 'antd';
import moment from 'moment';
import { Image } from 'antd';
import roomTypes, { RoomTypeMapping } from '@/constants/roomTypes';

const ContractDrawerInfo = ({ roomId, allRooms }: any) => {
  const roomInfo = allRooms?.find((room: any) => room?.id === roomId);

  const roomTypeKey: keyof RoomTypeMapping = roomInfo?.type;
  const roomType = roomTypes[roomTypeKey];

  const items: DescriptionsProps['items'] = [
    {
      label: 'Contract info',
      children: (
        <>
          {`• Name: ${roomInfo?.contracts?.[0]?.name}`}
          <br />
          {`• Amount: ${roomInfo?.contracts?.[0]?.amount}`}
          <br />
          {`• Period: ${moment(roomInfo?.contracts?.[0]?.startDate).format(
            'DD/MM/YYYY',
          )} - ${moment(roomInfo?.contracts?.[0]?.endDate).format(
            'DD/MM/YYYY',
          )}`}
          <br />
          {`• Capacity: ${roomInfo?.capacity}`}
          <br />• Type: <Tag color="green">{`${roomType}`}</Tag>
        </>
      ),
    },

    {
      label: 'Facilities',
      children: (
        <>
          • WIFI
          <br />
          • Cabinet
          <br />
          • Study table
          <br />
          • Kitchen
          <br />• Toilet
        </>
      ),
    },
  ];

  return (
    <div>
      <Image style={{ borderRadius: 10 }} width={330} src={roomInfo?.preview} />
      <Descriptions
        style={{ marginTop: 20 }}
        bordered
        layout="vertical"
        size="small"
        column={{ xs: 1, sm: 2, md: 1, lg: 1, xl: 1, xxl: 1 }}
        items={items}
      />
    </div>
  );
};

export default ContractDrawerInfo;
