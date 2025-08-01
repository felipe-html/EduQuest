import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list";
import { userProgress } from "@/db/schema";

const CoursesPage = async () =>{
    const coursesData = await getCourses();
    const UserProgressData = await getUserProgress();

    const [courses,userProgress] = await Promise.all([
        coursesData,
        UserProgressData
    ])
    return(

        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Cursos
            </h1>
            <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
        </div>
    );
}

export default CoursesPage;