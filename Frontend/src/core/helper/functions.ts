import { UserReturnDto, UserRole } from '../model/user.model';

export function getGroupStatus(status: boolean) {
  switch (status) {
    case false:
      return 'INACTIVE';
    case true:
      return 'ACTIVE';
    default:
      return status;
  }
}

export function getUserStatus(status: boolean) {
  switch (status) {
    case false:
      return 'INACTIVE';
    case true:
      return 'ACTIVE';
    default:
      return status;
  }
}

function getRole(role: string) {
  return UserRole[role];
}

export function roleCheck(
  perpetrator: UserReturnDto,
  prey: UserReturnDto
) {
  if (prey) {
    if (perpetrator.id === prey.id) {
      return true;
    } else {
      if (getRole(perpetrator.role) > getRole(prey.role)) {
        return true;
      }
    }
  }
  return false;
}

export function groupBy<T>(arr: T[], fn: (item: T) => any) {
  return arr.reduce<Record<string, T[]>>((prev, curr) => {
    const groupKey = fn(curr);
    const group = prev[groupKey] || [];
    group.push(curr);
    return { ...prev, [groupKey]: group };
  }, {});
}
