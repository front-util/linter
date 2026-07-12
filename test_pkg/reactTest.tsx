import React from 'react';

interface Props {
    name: string;
    age : number;
}

const UserComponent: React.FC<Props> = ({ name, age, }) => (
    <div>
        <h1>Hello {name}</h1>
        <p>You are {age} years old.</p>
    </div>
);

export default UserComponent;
