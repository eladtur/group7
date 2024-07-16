from flask import Blueprint, render_template

SetAppointment_bp = Blueprint(
    'SetAppointment',
    __name__,
    static_folder='static',
    static_url_path='/pages/SetAppointment',
    template_folder='templates'
)

@SetAppointment_bp.route('/')
@SetAppointment_bp.route('/SetAppointment')
def SetAppointment_page():
    return render_template('SetAppointment.html')