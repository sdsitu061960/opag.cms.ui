export interface IGetUser {
    id: string,
    email: string,
    userName: string
}

export interface IUpdateUser {
      Id : string;
      Email : string;
      UserName : string;
      CurrentPassword : string; 
      NewPassword : string;      
      Roles : []; 
} 