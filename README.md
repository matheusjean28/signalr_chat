
# SignalR Chat React - With Groups

This doc cover some major parts about **SignalR Chat React**

Let´s see how the folders are strucured at this project, lets start:

## App structure

The application is strucured by this way:

- **Context**: The app Context is maneged by the React Context Api, given informations to the components.

- **Componentes**:  
   - **AppContext**: That component provides information to others, some like this:

| Properties           | Description                                   |
|-----------------------|---------------------------------------------|
| CurrentChat            | The ID of the current Chat that user in. |
| setIsEditing      | Indicates whether the user is currently editing something|
| UserInfo | Data of the loged User, like Id, UserName,Gender, etc.|
| Connection               | Object that hold the current connection, has **Context** |
| Username              | Logged In username           |   
   
     
---


  - **ChatRooms**: That Component Fetch and show avaliable rooms to join whether user have credential.
  
  - **RenderAllMessages**: Component responsible to display all message over the current chat that user is in.

  - **ChatMain**: Functional component that only check if message input is not null or empyt and call invoker method to send message.

#### others components haven´t the same importance
Ensure read more the code...

---

## RenderAllMessages Component

This component is responsible for rendering all messages in a specific chat room.

### Functionalities

- **Message Rendering**: Render all messages in a list, displaying sender and message.

### Props
This component dont accept props.


---



[notation]
as a look, when I try to pass connection instance by a function handle it,
it get a new connection instance, that means the user will lost connection id
that already been validated