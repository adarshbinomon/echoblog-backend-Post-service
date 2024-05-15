import { kafka } from "../config/kafkaClient";
import { updateUserController } from "../libs/controllers/consumeControllers";
import { Dependencies } from "../utils/interfaces/dependency.interface";

const consumer = kafka.consumer({
  groupId: "post-service2",
});

export const userUpdateConsumer = async (dependencies: Dependencies) => {
  try {
    console.log("consuming from user service to post service");

    await consumer.connect();
    await consumer.subscribe({ topic: "userTopic", fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          console.log("message recieved from post service");
          const binaryData: any = message.value;
          const jsonString: string = binaryData?.toString();
          const jsonData = JSON.parse(jsonString);
          const messageType = jsonData?.type;

          if (messageType === "updateUser") {
            await updateUserController(dependencies, jsonData.data);
          } else {
            console.log("Unhandled message type:", messageType);
          }
        } catch (error) {
          console.error("Error processing message:", error);
        }
      },
    });
  } catch (error) {
    console.error("Error in auth consumer", error);
  }
};
