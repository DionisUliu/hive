import * as registrationDal from '../register/register.dal';
import * as roomDal from '../room/room.dal';
import * as contractDal from '../contract/contract.dal';

export const getAnalytics = async () => {
  const activeRoomIds = await registrationDal.getActiveRoomsIds();
  const activeResidentsIds = await registrationDal.getActiveResidentsIds();
  const activeContractsIds = await registrationDal.getActiveContractsIds();
  const activeContractsLength = activeContractsIds.length;

  const availableRooms = {
    A: 0,
    B: 0,
    C: 0,
  };

  const availableResidents = {
    A: 0,
    B: 0,
    C: 0,
  };

  const activeContractsData = await getActiveContractsData(activeContractsIds);

  activeRoomIds.forEach(async (activeRoom) => {
    const room = await roomDal.getRoomById(activeRoom.roomId);
    const roomName = room?.name;
    if (roomName?.charAt(0) === 'A') {
      availableRooms.A++;
    }
    if (roomName?.charAt(0) === 'B') {
      availableRooms.B++;
    }
    if (roomName?.charAt(0) === 'C') {
      availableRooms.C++;
    }
  });

  activeResidentsIds.forEach(async (activeResident) => {
    const room = await roomDal.getRoomById(activeResident.roomId);
    const roomName = room?.name;
    if (roomName?.charAt(0) === 'A') {
      availableResidents.A++;
    }
    if (roomName?.charAt(0) === 'B') {
      availableResidents.B++;
    }
    if (roomName?.charAt(0) === 'C') {
      availableResidents.C++;
    }
  });

  const {
    todayContracts,
    yesterdayContracts,
    monthlyContracts,
    previousMonthContracts,
    yearlyContracts,
    previousYearContracts,
    soonToExpire,
  } = activeContractsData;

  const contracts = {
    activeContractsLength,
    soonToExpire,
  };

  const statistics = {
    daily: yearlyContracts
      ? `${(todayContracts / yesterdayContracts) * 100}`
      : 'infinite',
    monthly: previousMonthContracts
      ? `${(monthlyContracts / previousMonthContracts) * 100}`
      : 'infinite',
    yearly: previousYearContracts
      ? `${(yearlyContracts / previousYearContracts) * 100}`
      : 'infinite',
  };

  return { availableRooms, availableResidents, contracts, statistics };
};

const getActiveContractsData = async (
  activeContractsIds: {
    contractId: string;
  }[],
) => {
  const contractData = {
    todayContracts: 0,
    yesterdayContracts: 0,
    monthlyContracts: 0,
    previousMonthContracts: 0,
    yearlyContracts: 0,
    previousYearContracts: 0,
    soonToExpire: 0,
  };

  for (const contract of activeContractsIds) {
    const foundContract = await contractDal.getContractById(
      contract.contractId,
    );

    if (foundContract?.endDate) {
      const endDate = new Date(foundContract.endDate);
      const today = new Date();

      const areInSameDay =
        endDate.getFullYear() === today.getFullYear() &&
        endDate.getMonth() === today.getMonth() &&
        endDate.getDate() === today.getDate();

      const isYesterday =
        endDate.getFullYear() === today.getFullYear() &&
        endDate.getMonth() === today.getMonth() &&
        endDate.getDate() === today.getDate() - 1;

      const isCurrentMonth =
        endDate.getFullYear() === today.getFullYear() &&
        endDate.getMonth() === today.getMonth();

      const isPrevMonth =
        endDate.getFullYear() === today.getFullYear() &&
        endDate.getMonth() === today.getMonth() - 1;

      const isCurrentYear = endDate.getFullYear() === today.getFullYear();

      const isPrevYear = endDate.getFullYear() === today.getFullYear() - 1;

      if (areInSameDay) {
        contractData.todayContracts++;
      }
      if (isYesterday) {
        contractData.yesterdayContracts++;
      }

      if (isCurrentMonth) {
        contractData.monthlyContracts++;
      }
      if (isPrevMonth) {
        contractData.previousMonthContracts++;
      }
      if (isCurrentYear) {
        contractData.yearlyContracts++;
      }
      if (isPrevYear) {
        contractData.previousYearContracts++;
      }

      if (endDate <= today) {
        contractData.soonToExpire++;
      }
    }
  }

  return contractData;
};
