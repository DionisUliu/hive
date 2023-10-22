import {
  Descriptions,
  DescriptionsProps,
  Image,
  Spin,
  Tag,
} from 'antd';
import moment from 'moment';
import endpoints from '@/constants/endpoints';
import useGetApi from '@/lib/hooks/useGetApi';
import roomTypes, { RoomTypeMapping } from '@/constants/roomTypes';

const ResidentsDrawerInfo = ({ residentId, residentData }: any) => {
  const residentContractInfo = residentData?.find(
    (resident: any) => resident?.id === residentId,
  );

  const { data: roomData, loading } = useGetApi<any>(
    `${endpoints.ROOM}${residentContractInfo?.contract?.roomId}`,
  );

  const roomTypeKey: keyof RoomTypeMapping = roomData?.type;
  const roomType = roomTypes[roomTypeKey];

  const items: DescriptionsProps['items'] = [
    {
      label: 'Contract info',
      children: (
        <>
          {`• Name: ${residentContractInfo?.contract?.name}`}
          <br />
          {`• Amount: ${residentContractInfo?.contract?.amount}`}
          <br />
          {`• Period: ${moment(
            residentContractInfo?.contract?.startDate,
          ).format('DD/MM/YYYY')} - ${moment(
            residentContractInfo?.contract?.endDate,
          ).format('DD/MM/YYYY')}`}
          <br />
          {`• Capacity: ${roomData?.capacity}`}
          <br />• Type: <Tag color="green">{`${roomType}`}</Tag> <br />• Room
          nr.: <Tag color="red">{`${roomData?.name}`}</Tag>
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
      {
        loading ? (
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '40vh',
            }}
          >
            <Spin size="large" />
          </span>
        ):(
          <>
          <Image style={{ borderRadius: 10 }} width={330} src={roomData?.preview} />
          <Descriptions
            style={{ marginTop: 20 }}
            bordered
            layout="vertical"
            size="small"
            column={{ xs: 1, sm: 2, md: 1, lg: 1, xl: 1, xxl: 1 }}
            items={items}
            />
        </>
        )
      }
    </div>
  );
};

export default ResidentsDrawerInfo;
