import React, { useEffect, useMemo } from 'react';
import StarRatings from "../../../components/starRatings/starRatings";
import NoRecordsFound from '../../../components/noRecordsFound/noRecordsFound';
import PieChart from '../../../components/pieChart/pieChart';
import { useSelector, useDispatch } from 'react-redux';

const ProjectReviewMarks = () => {
    const allStudents = useSelector((state) => state.getAllStudents);
    const user = useSelector((state) => state.loginUser);
    const isDark = useSelector((state) => state.toggle.isChecked);

    // Create a copy of the students array to avoid mutating Redux state
    const sortedData = useMemo(() => {
        return allStudents?.students?.length
            ? [...allStudents.students].sort((a, b) => {
                const aMarks = a.projectReviewMarks ? Number(a.projectReviewMarks) : 0;
                const bMarks = b.projectReviewMarks ? Number(b.projectReviewMarks) : 0;
                return bMarks - aMarks;  // Sort in descending order
            })
            : [];
    }, [allStudents?.students]);

    const limitedData = sortedData?.slice(0, 10);

    const getPerformanceCategory = (marks) => {
        if (marks >= 90) return 'Excellent';
        if (marks >= 75) return 'Good';
        if (marks >= 50) return 'Average';
        if (marks >= 30) return 'Needs Improvement';
        return 'Bad';
    };

    return (
        <div className='p-6'>
            {!user?.isAdmin ? (
                user?.user?.projectReviewMarks ? (
                    <div>
                        <div className='flex rounded items-center gap-4 border shadow-lg p-6 w-[500px]'>
                            <PieChart targetPercentage={user?.user?.projectReviewMarks ? user?.user?.projectReviewMarks : 0} />
                            <StarRatings height={"50px"} width={"50px"} rating={user?.user?.projectReviewMarks ? user?.user?.projectReviewMarks : 0} />
                        </div>
                        <div className='mt-4'>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ backgroundColor: "#f2f2f2", border: "1px solid #ddd" }}>
                                        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>S.no</th>
                                        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Name</th>
                                        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Marks</th>
                                        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Performance</th>
                                        <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Ratings</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ border: "1px solid #ddd" }}>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>1</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>Project Review Marks</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user?.user?.projectReviewMarks ? user?.user?.projectReviewMarks : 0}/100</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{getPerformanceCategory(user?.user?.projectReviewMarks)}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                            <StarRatings height={"24px"} width={"24px"} rating={user?.user?.projectReviewMarks ? user?.user?.projectReviewMarks : 0} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <NoRecordsFound />
                )
            ) : (
                user?.isAdmin && limitedData?.length > 0 ? (
                    <div>
                        <p className="font-bold text-[25px] text-gray-700 mb-4">Top 10 Performer In Project Review</p>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#f2f2f2", border: "1px solid #ddd" }}>
                                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>S.no</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Name</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Email</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Marks</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Performance</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Ratings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {limitedData.map((user, index) => (
                                    <tr className={`${isDark ? "text-white" : "text-black"}`} key={user._id} style={{ border: "1px solid #ddd" }}>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.username}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.email}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.projectReviewMarks ? user.projectReviewMarks : 0}/100</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{getPerformanceCategory(user.projectReviewMarks)}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                            <StarRatings height={"24px"} width={"24px"} rating={user.projectReviewMarks ? user.projectReviewMarks : 0} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='mt-20'>
                        <NoRecordsFound />
                    </div>
                )
            )}
        </div>
    );
};

export default ProjectReviewMarks;
