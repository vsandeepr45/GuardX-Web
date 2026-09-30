// export const hasPermission = (permission) => {

//     const user = JSON.parse(

//         localStorage.getItem("user")

//     );

//     if (!user) return false;

//     if (!user.permissions) return false;

//     return user.permissions.includes(permission);

// };

/**
 * ==========================================
 * GuardX Permission Helper
 * ==========================================
 */

export function hasPermission(user, permission) {

    if (!user) {

        return false;

    }

    // Super Admin / Admin (optional override)
    if (user.role === "Admin" || user.role === "Super Admin") {

        return true;

    }

    if (!user.permissions) {

        return false;

    }

    return user.permissions.includes(permission);

}


/**
 * Check multiple permissions
 */

export function hasAnyPermission(user, permissions) {

    if (!user || !user.permissions) {

        return false;

    }

    return permissions.some(permission =>
        user.permissions.includes(permission)
    );

}


/**
 * Check all permissions
 */

export function hasAllPermissions(user, permissions) {

    if (!user || !user.permissions) {

        return false;

    }

    return permissions.every(permission =>
        user.permissions.includes(permission)
    );

}